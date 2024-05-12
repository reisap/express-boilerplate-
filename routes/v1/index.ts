import * as users from './users'
import * as post from './post'
import {verifyToken} from '../../lib/middleware/auth'

module.exports = (router) => {
    //you can use global middleware in this routes, like jwt token
    //router.use(middleware)
    //or you can spesify into routes
    //router.use('/find',jwtMiddleware,user)
    //sebenarnya bisa saja kita buat mana yang public or private sehingga akan mudah dipisahkan dan bisa dibuat dengan cara router.use(middleware) --> tapi cara ini rawan kesalahan,
    //alih alih global lebih baik satu persatu, agar lebih mudah di control
    router.use('/users', users)
    router.use('/post', verifyToken, post)
}
