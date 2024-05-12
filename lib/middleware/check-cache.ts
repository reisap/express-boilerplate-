import RedisClient from '../database/redis.js'
let client = new RedisClient()
let clientRedis = client.run().client

export const checkCachePostById = async (req, res, next) => {
    let search = 'post-' + req.params.id

    let result = await clientRedis.get(search)

    if (result != null) {
        result = JSON.parse(result)
        result.info = 'data from cache'
        return res.send(result)
    }
    next()
}

export const checkCachePost = async (req, res, next) => {
    //post-all-page:${page}-limit:${limit}
    let page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 10
    let search = `post-all-page:${page}-limit:${limit}`

    let result = await clientRedis.get(search)

    if (result != null) {
        result = JSON.parse(result)
        result.info = 'data from cache'
        return res.send(result)
    }
    next()
}
