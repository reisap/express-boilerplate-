import ResponseDto from '../../lib/dto/response.dto'

export class UsersController {
    constructor(services) {
        this.service = services
    }

    async createUser(data) {
        let result = await this.service.createUser(data)
        if (result.error) {
            //ada error
            return {
                error: result.result,
            }
        }

        let response = new ResponseDto({message: 'success', data: result.result, code: 200}).response()
        return response
    }
    async findUser() {
        let result = await this.service.findUser()
        if (result.error) {
            //ada error
            return {
                error: result.result,
            }
        }

        let response = new ResponseDto({message: 'success', data: result.result, code: 200}).response()
        return response
    }
    async findOneUser(id) {
        let result = await this.service.findOneUser(id)
        if (result.error) {
            //ada error
            return {
                error: result.result,
            }
        }

        let response = new ResponseDto({message: 'success', data: result.result, code: 200}).response()
        return response
    }
    async deleteUser(id) {
        let result = await this.service.deleteUser(id)
        if (result.error) {
            //ada error
            return {
                error: result.result,
            }
        }

        let response = new ResponseDto({message: 'success', data: result.result, code: 200}).response()
        return response
    }
    async updateUser(params, paramsBody) {
        let result = await this.service.updateUser(params, paramsBody)
        if (result.error) {
            //ada error
            return {
                error: result.result,
            }
        }

        let response = new ResponseDto({message: 'success', data: result.result, code: 200}).response()
        return response
    }
}
