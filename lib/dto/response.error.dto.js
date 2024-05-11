export default class ResponseErrorDto {
    constructor({data, message, code}) {
        this.data = data || null
        this.message = message || 'oops, somenthings got error'
        this.code = code || 401
        this.error = true
    }

    response() {
        let result = {
            code: this.code,
            message: this.message,
            data: this.data,
            error: this.error,
            timestamp: new Date(),
        }

        return result
    }
}
