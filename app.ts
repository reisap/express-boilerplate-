require('./lib/middleware/group')
const express = require('express')
import * as cookieParser from 'cookie-parser'
import * as logger from 'morgan'
import * as path from 'path'
const sequelize = require("'./lib/database/database'")
import * as cors from 'cors'
const errorHandler = require('./lib/dto/error.handler.dto')
import * as http from 'http'
const socketIO = require('socket.io')
import helmet from 'helmet'
const cookieSession = require('cookie-session')
import * as responseTime from 'response-time'

require('./domain/notification/index')()
var app = express()
const serverIO = http.createServer(app)
export const io = socketIO(serverIO, {
    transports: ['websocket'],
    allowUpgrades: false,
    upgrade: false,
})

const expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
app.use(
    cookieSession({
        name: 'session',
        keys: ['Authentication'],
        cookie: {
            secure: true,
            httpOnly: true,
            expires: expiryDate,
        },
    })
)

io.on('connection', (socket) => {
    console.log('connected')
    socket.on('disconnect', function () {
        console.log('disconnected')
    })
})

let routerV1 = require('./routes/v1/index')
let routerV2 = require('./routes/v2/index')

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
