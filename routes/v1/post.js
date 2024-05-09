var express = require('express')
var router = express.Router()
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
    res.json(result)
})

router.get('/:id', async (req, res, next) => {
    let params = req.params.id
    let result = await controller.findOnePost(params)
    res.json(result)
})

//need dto to check input json user from request
router.post('/', validateInsertPost, async (req, res, next) => {
    //ada 2 cara untuk dapatkan userID
    //1. melalui langsung cara nya seperti ini
    //2. melalui payload dari JWT token
    let params = req.body
    let result = await controller.createPost(params)
    res.json(result)
})

router.delete('/:id', async (req, res, next) => {
    let params = req.params.id
    let result = await controller.deletePost(params)
    res.json(result)
})

router.put('/:id', async (req, res, next) => {
    let params = req.params.id
    let paramsBody = req.body
    if (params && Object.keys(paramsBody).length != 0) {
        console.log(paramsBody)
        let result = await controller.updatePost(params, paramsBody)
        res.json(result)
    } else {
        res.status(500).json({error: true})
    }
})

//end standart CRUD function

module.exports = router
