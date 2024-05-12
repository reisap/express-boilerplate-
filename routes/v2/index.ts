const routerApiv2 = (router) => {
    console.log('masuk router v2 aa')

    router.get('/hei', (req, res, next) => {
        console.log('masuk sini')
        res.send('halo')
    })
}

export default routerApiv2
