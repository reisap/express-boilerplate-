var express = require('express')
var router = express.Router()
import {validateInsertUser} from '../../domain/users/dto/validation.user'
const {UsersRepository} = require('../../domain/users/users.repository')
const {UsersController} = require('../../domain/users/users.controller')
const {UsersService} = require('../../domain/users/users.services')

import {verifyToken} from '../../lib/middleware/auth'

import {eventEmitter} from '../../lib/middleware/event-emitter'

//DI
let repository = new UsersRepository()
let service = new UsersService(repository)
let controller = new UsersController(service)

//routing

//routing forgot password
//1. user masukin email --> bikin function check email untuk forgot password json hanya email
router.post('/forgot-password', async (req, res, next) => {
    //disini check email dan kirim email ke user untuk activation kembali
    //disini seharusnya juga ada target untuk redirect halaman user,,biar lebih mudahnya jadi bisa ikut masuk ke link email user
    let email = req.body?.email
    let targetRedirect = req.body.url_target || req.headers.host || 'http://localhost:3000'
    if (email) {
        let result = await controller.forgotPasswordUser(targetRedirect, {email: email})
        res.send(result)
    } else {
        res.status(404).send({
            message: 'oops, you cannot enter this way !!!',
        })
    }
})

//2. user verify email and click link in their email
//seharusnya disini berupa tampilan ui sehingga ketika user click bisa langsung isi new password dari token yang sudah dikasih via email
router.get('/password-reset', async (req, res, next) => {
    //req.query.token
    let token = req.query.token
    //confirm from email user
    if (token) {
        let result = await controller.verifyResetPasswordUserByEmail(token)
        //seharusnya redirect ke halaman frontend, ini hanya untuk sementara supaya terlihat bahwa ini berhasil
        //req.headers.host untuk proses redirect res.redirect(req.headers.host) or web traget for frontend
        res.send(result)
    } else {
        res.status(404).send({
            message: 'oops, you cannot enter this way !!!',
        })
    }
})
//3. user create new password from forgot password
router.post('/password-reset', async (req, res, next) => {
    //req.body.email ---> ini didapat dari hasil no 2, jadi frontend kembalikan return response dari proses yang kedua kesini,jadi pasti akan dapat email nya, tetapi seharusnya di UI tidak ada field ini yah
    //req.body.password --> ini didapat dari ui di front end,, seharusnya nanti disana hanya berisi 1 field berupa password,,karena user lupa password yang dia punya.
    let email = req.body.email
    let password = req.body.password
    //confirm from email user
    if (email && password) {
        let result = await controller.updateUserForgotPassword({email, password})
        res.send(result)
    } else {
        res.status(404).send({
            message: 'oops, you cannot enter this way !!!',
        })
    }
})

//end routing forgot password

//reset password di sistem, ini bukan forgot password tapi untuk usecase user mau sengaja ganti password
router.post('/change-password', async (req, res, next) => {
    //req.body.email
    //req.body.password
    //req.body.new_password
    //response berupa sukses dan suruh lihat email saja, jangan tampilkan token generate disini
    let email = req.body.email
    let password = req.body.password
    let new_password = req.body.new_password

    if (email && password && new_password) {
        let result = await controller.setNewPasswordUser({email: email, password: password, new_password: new_password})
        res.send(result)
    } else {
        res.status(404).send({
            message: 'oops, you cannot enter this way !!!',
        })
    }
})

router.get('/verify', async (req, res, next) => {
    let token = req.query?.token
    if (token) {
        let result = await controller.verifyUserByEmailToken(token)
        //seharusnya redirect ke halaman frontend, ini hanya untuk sementara supaya terlihat bahwa ini berhasil
        //req.headers.host untuk proses redirect res.redirect(req.headers.host) or web traget for frontend
        res.send(result)
    } else {
        res.status(404).send({
            message: 'oops, you cannot enter this way !!!',
        })
    }
})

router.post('/login', async (req, res, next) => {
    let email = req.body.email
    let password = req.body.password
    if (email != '' && password != '') {
        let result = await controller.loginUser({email, password})
        res.cookie('Authentication', result.token, {
            httpOnly: true,
        })
        eventEmitter.emit('user login', result)
        res.send(result)
    } else {
        res.send({
            error: true,
            messaage: 'Please enter username and password',
        })
    }
})

router.get('/', verifyToken, async (req, res, next) => {
    let page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 10
    let result = await controller.findUser(limit, page)
    res.send(result)
})

router.get('/:id', verifyToken, async (req, res, next) => {
    let params = req.params.id
    let result = await controller.findOneUser(params)
    res.send(result)
})

//need dto to check input json user from request
router.post('/', validateInsertUser, async (req, res, next) => {
    let params = req.body
    let result = await controller.createUser(params)
    res.send(result)
})

router.delete('/:id', verifyToken, async (req, res, next) => {
    let params = req.params.id
    const authenticatedUser = req.userId
    if (!authenticatedUser || authenticatedUser.id != req.params.id) {
        // return next(new ForbiddenException('unauthroized_user_delete'))
        res.status(403).send({
            error: true,
            messaage: 'unauthroized_user_delete',
        })
    } else {
        let result = await controller.deleteUser(params)
        res.send(result)
    }
})

router.put('/:id', verifyToken, async (req, res, next) => {
    const authenticatedUser = req.userId
    if (!authenticatedUser || authenticatedUser.id != req.params.id) {
        //return next(new ForbiddenException('unauthroized_user_update'))
        res.status(403).send({
            error: true,
            messaage: 'unauthroized_user_update',
        })
    } else {
        let params = req.params.id
        let paramsBody = req.body
        if (params && Object.keys(paramsBody).length != 0) {
            console.log(paramsBody)
            let result = await controller.updateUser(params, paramsBody)
            res.send(result)
        } else {
            res.status(500).send({error: true})
        }
    }
})

module.exports = router
