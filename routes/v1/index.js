import users from './users'

module.exports = (router) => {
    router.use('/users', users)
}
