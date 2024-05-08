import ResponseDto from '../../lib/dto/response.dto'

export class UsersController {
    constructor(services) {
        this.service = services
    }

    async createUser({req, res, data}) {
        try {
            let result = await this.service.createUser(data)
            // let response = new ResponseDto()

            return {
                result: result,
                error: false,
            }
        } catch (e) {
            return {
                result: e,
                error: true,
            }
        }
    }
}
