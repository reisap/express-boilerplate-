var express = require('express')
var router = express.Router()
import {io} from '../../app.js'
import {validateInsertPost} from '../../domain/posts/dto/create-post.dto'

import {PostController} from '../../domain/posts/posts.controller'
import {PostService} from '../../domain/posts/posts.services'
import {PostRepository} from '../../domain/posts/posts.repository'

//DI
let repository = new PostRepository()
let service = new PostService(repository)
let controller = new PostController(service)

//standart CRUD function
router.get('/', async (req, res, next) => {
    let page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 10
    let result = await controller.findPost(limit, page)
    res.send(result)
})

router.get('/:id', async (req, res, next) => {
    let params = req.params.id
    let result = await controller.findOnePost(params)
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
