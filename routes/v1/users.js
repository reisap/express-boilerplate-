var express = require('express')
var router = express.Router()
import {validateInsertUser} from '../../domain/users/dto/validation.user'
const {UsersRepository} = require('../../domain/users/users.repository')
const {UsersController} = require('../../domain/users/users.controller')
const {UsersService} = require('../../domain/users/users.services')

//DI
let repository = new UsersRepository()
let service = new UsersService(repository)
let controller = new UsersController(service)

//routing

router.get('/', function (req, res, next) {
    res.send('respond with a resource')
})

//need dto to check input json user from request
router.post('/', validateInsertUser, async (req, res, next) => {
    let params = req.body
    let result = await controller.createUser({data: params, req, res})
    res.json(result)
})

module.exports = router
