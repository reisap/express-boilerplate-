class ResponseDto {
    constructor({data, message, code}) {
        this.data = data
        this.message = message
        this.code = code
    }

    response() {
        let result = {
            code: this.code,
            message: this.message,
            data: this.data,
        }

        return result
    }
}
