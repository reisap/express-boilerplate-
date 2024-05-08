var express = require('express')
var router = express.Router()
import {validateInsertUser} from '../../domain/users/dto/validation.user'
const {UsersRepository} = require('../../domain/users/users.repository')
const {UsersController} = require('../../domain/users/users.controller')
const {UsersService} = require('../../domain/users/users.services')

import {verifyToken} from '../../lib/middleware/auth'

//DI
let repository = new UsersRepository()
let service = new UsersService(repository)
let controller = new UsersController(service)

//routing

router.post('/login', async (req, res, next) => {
    let email = req.body.email
    let password = req.body.password
    if (email != '' && password != '') {
        let result = await controller.loginUser({email, password})
        res.cookie('Authentication', result.token, {
            httpOnly: true,
        })
        res.json(result)
    } else {
        res.json({
            error: true,
            messaage: 'Please enter username and password',
        })
    }
})

router.get('/', verifyToken, async (req, res, next) => {
    let page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 10
    let result = await controller.findUser(limit, page)
    res.json(result)
})

router.get('/:id', verifyToken, async (req, res, next) => {
    let params = req.params.id
    let result = await controller.findOneUser(params)
    res.json(result)
})

//need dto to check input json user from request
router.post('/', validateInsertUser, async (req, res, next) => {
    let params = req.body
    let result = await controller.createUser(params)
    res.json(result)
})

router.delete('/:id', verifyToken, async (req, res, next) => {
    let params = req.params.id
    let result = await controller.deleteUser(params)
    res.json(result)
})

router.put('/:id', verifyToken, async (req, res, next) => {
    let params = req.params.id
    let paramsBody = req.body
    if (params && Object.keys(paramsBody).length != 0) {
        console.log(paramsBody)
        let result = await controller.updateUser(params, paramsBody)
        res.json(result)
    } else {
        res.status(500).json({error: true})
    }
})

module.exports = router
