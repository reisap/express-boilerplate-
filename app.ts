require('./lib/middleware/group')
import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import path from 'path'
import {sequelize} from './lib/database/database'
import cors from 'cors'
const errorHandler = require('./lib/dto/error.handler.dto')
import http from 'http'

import {Server} from 'socket.io'

import helmet from 'helmet'
import cookieSession from 'cookie-session'
import responseTime from 'response-time'

//routing apps
import routerApiv1 from './routes/v1/index'
import routerV2 from './routes/v2/index'

require('./domain/notification/index')()
var app = express()
const serverIO = http.createServer(app)
export const io = new Server(serverIO, {
    transports: ['websocket'],
    allowUpgrades: false,
})

// const expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
app.use(
    cookieSession({
        name: 'session',
        keys: ['Authentication'],
        maxAge: 60 * 60 * 1000,
    })
)

io.on('connection', (socket) => {
    console.log('connected')
    socket.on('disconnect', function () {
        console.log('disconnected')
    })
})

app.use(responseTime())
app.use(
    cors({
        exposedHeaders: ['X-Response-Time'],
    })
)
app.use(helmet())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

//connect database
sequelize.sync()

//v1
app.group('/api/v1', (router) => {
    routerApiv1(router)
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
