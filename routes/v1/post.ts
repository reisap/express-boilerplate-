var express = require('express')
var router = express.Router()
import {io} from '../../app.js'
import {validateInsertPost} from '../../domain/posts/dto/create-post.dto.js'

import {PostController} from '../../domain/posts/posts.controller.js'
import {PostService} from '../../domain/posts/posts.services.js'
import {PostRepository} from '../../domain/posts/posts.repository.js'

//redis cache
import RedisClient from '../../lib/database/redis.js'
let {checkCachePostById, checkCachePost} = require('../../lib/middleware/check-cache')
let client = new RedisClient()
//DI
let repository = new PostRepository()
let service = new PostService(repository)
let controller = new PostController(service)

//standart CRUD function
router.get('/', checkCachePost, async (req, res, next) => {
    let page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 10
    let result = await controller.findPost(limit, page)
    client.run().client.setEx(`post-all-page:${page}-limit:${limit}`, 120, JSON.stringify(result))

    res.send(result)
})

router.get('/:id', checkCachePostById, async (req, res, next) => {
    let params = req.params.id
    let result = await controller.findOnePost(params)
    //client.run().client.set(params, JSON.stringify(result))
    client.run().client.setEx(`post-${params}`, 3600, JSON.stringify(result))

    res.send(result)
})

//need dto to check input json user from request
router.post('/', validateInsertPost, async (req, res, next) => {
    let params = req.body
    params.userId = req.userId //kita dapatkan userId dari jwt token
    let result = await controller.createPost(params)
    if (result.error != true) {
        io.emit('new-post', {result: result, userId: result.data.userId, postId: result.data.id}) //socket io for realtime in frontend
    }
    res.send(result)
})

router.delete('/:id', async (req, res, next) => {
    let id = req.params.id
    let userId = req.userId
    let result = await controller.deletePost(id, userId)
    res.send(result)
})

router.put('/:id', async (req, res, next) => {
    let params = req.params.id
    let paramsBody = req.body
    paramsBody.userId = req.userId
    if (params && Object.keys(paramsBody).length != 0) {
        let result = await controller.updatePost(params, paramsBody)
        if (result.error != true) {
            io.emit('edit-post', {result: result, userId: result.data.userId, postId: result.data.id}) //socket io for realtime in frontend
        }
        res.send(result)
    } else {
        res.status(500).send({error: true})
    }
})

//end standart CRUD function

module.exports = router
