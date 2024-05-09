var express = require('express')
var router = express.Router()

router.get('/', async (req, res, next) => {
    res.send('from post')
})

module.exports = router
