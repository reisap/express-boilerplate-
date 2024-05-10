import express from 'express'
require('./lib/middleware/group')

import cookieParser from 'cookie-parser'
import logger from 'morgan'
import path from 'path'
import sequelize from './config/database'
import cors from 'cors'
import errorHandler from './lib/dto/error.handler.dto'
import http from 'http'
import socketIO from 'socket.io'

var app = express()
const serverIO = http.createServer(app)
export const io = socketIO(serverIO, {
    transports: ['websocket'],
    allowUpgrades: false,
    upgrade: false,
})

io.on('connection', (socket) => {
    console.log('connected')
    socket.on('disconnect', function () {
        console.log('disconnected')
    })
})

let routerV1 = require('./routes/v1/index')
let routerV2 = require('./routes/v2/index')

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

//connect database
sequelize.sync()

//v1
app.group('/api/v1', (router) => {
    routerV1(router)
})

//v2
app.group('/api/v2', (router) => {
    routerV2(router)
})

app.use(errorHandler)

serverIO.listen(process.env.PORT || '3000')
module.exports = {
    app,
}
