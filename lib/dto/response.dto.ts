interface IResponse {
    data?: any
    message: string
    code: number
}

export default class ResponseDto {
    private data: any
    private message: string
    private code: number
    constructor({data, message, code}: IResponse) {
        this.data = data
        this.message = message
        this.code = code
    }

    response() {
        let result = {
            code: this.code,
            message: this.message,
            data: this.data,
            timestamp: new Date(),
        }

        return result
    }
}
