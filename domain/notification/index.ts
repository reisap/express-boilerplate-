import {eventEmitter} from '../../lib/middleware/event-emitter'
import NotificationService from './notification.service'

// let notifService = new NotificationService()

module.exports = () => {
    eventEmitter.on('user login', (result) => {
        console.log('user login == ', result.data.dataValues)
    })

    eventEmitter.on('new user', (result) => {
        console.log('new user created')
    })

    eventEmitter.on('new post', (result) => {
        console.log('new post created')
    })
}
