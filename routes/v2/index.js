module.exports = (router) => {
    router.use('/', (req, res) => {
        res.json({
            message: 'v2 routes',
        })
    })
}
