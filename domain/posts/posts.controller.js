import ResponseDto from '../../lib/dto/response.dto'

export class PostController {
    constructor(service) {
        this.service = service
    }

    async createPost(data) {
        //ada 2 cara untuk dapatkan userID
        //1. melalui langsung cara nya seperti ini
        //2. melalui payload dari JWT token
        let result = await this.service.createPost(data)
        if (result.error) {
            //ada error
            return {
                result: result.result,
                error: true,
            }
        }
        let response = new ResponseDto({message: 'success', data: result.result, code: 200}).response()
        return response
    }

    async findPost(limit, page) {
        let result = await this.service.findPost(limit, page)
        if (result.error) {
            //ada error
            return {
                result: result.result,
                error: true,
            }
        }

        let response = new ResponseDto({message: 'success', data: result.result, code: 200}).response()
        return response
    }
    async findOnePost(id) {
        let result = await this.service.findOnePost(id)
        if (result.error) {
            //ada error
            return {
                result: result.result,
                error: true,
            }
        }

        let response = new ResponseDto({message: 'success', data: result.result, code: 200}).response()
        return response
    }
    async updatePost(id, paramsBody = {}) {
        let result = await this.service.updatePost(id, paramsBody)
        if (result.error) {
            //ada error
            return {
                result: result.result,
                error: true,
            }
        }

        let response = new ResponseDto({message: 'success', data: result.result, code: 200}).response()
        return response
    }
    async deletePost(id, userId) {
        let result = await this.service.deletePost(id, userId)
        if (result.error) {
            //ada error
            return {
                result: result.result,
                error: true,
            }
        }

        let response = new ResponseDto({message: 'success', data: result.result, code: 200}).response()
        return response
    }
}
