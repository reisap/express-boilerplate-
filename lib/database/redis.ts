const redis = require('@redis/client')

export default class RedisClient {
    public client: any
    constructor() {
        this.client = redis.createClient({url: 'redis://redis-db:6379'})
        this.client.connect()
    }
    run() {
        return this
    }
    async setKey({key, data}) {
        await this.client.set(key, data)
    }
    async getKey(key) {
        const myKeyValue = await this.client.get(key)
        console.log(myKeyValue)
        return myKeyValue
    }
    async sample(key = null, params = null) {
        await this.client.set('mykey', 'Hello from node redis')
    }

    async getSample() {
        const myKeyValue = await this.client.get('mykey')
        console.log(myKeyValue)
    }
}
