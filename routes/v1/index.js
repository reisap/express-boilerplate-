import users from './users'

module.exports = (router) => {
    //you can use global middleware in this routes, like jwt token
    //router.use(middleware)
    //or you can spesify into routes
    //router.use('/find',jwtMiddleware,user)
    // let ambilDariTest = TestClass.getModel(testClass)

    router.use('/users', users)
}
