interface IResponse {
    data?: any
    message: string
    code: number
}
export default class ResponseErrorDto {
    private data: any
    private message: string
    private code: number
    private error: boolean
    constructor({data, message, code}: IResponse) {
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
