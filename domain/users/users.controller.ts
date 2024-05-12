import ResponseDto from '../../lib/dto/response.dto'
import ResponseErrorDto from '../../lib/dto/response.error.dto'
import {generateToken} from '../../lib/middleware/auth'
import {sendAccountActivation, sendPasswordReset} from '../notification/email/email.service'
import * as bcrypt from 'bcryptjs'
import {randomString} from '../../lib/utils/generator'

export class UsersController {
    private service: any
    constructor(services) {
        this.service = services
    }
    async verifyResetPasswordUserByEmail(tokenGenerate) {
        let result = await this.service.verifyResetPasswordUserByEmail(tokenGenerate)
        if (result.error) {
            //ada error
            return {
                error: result.result,
            }
        }
        let response = new ResponseDto({message: 'success', data: result.result, code: 200}).response()
        return response
    }

    async verifyUserByEmailToken(tokenGenerate) {
        let result = await this.service.verifyUserByEmailToken(tokenGenerate)
        if (result.error) {
            //ada error
            return {
                error: result.result,
            }
        }
        let response = new ResponseDto({message: 'success', data: result.result, code: 200}).response()
        return response
    }

    async loginUser({email, password}) {
        let result = await this.service.loginUser({email, password})
        let response
        if (result.error) {
            //ada error
            return {
                error: result.result,
            }
        } else if (result.result.inactive == true) {
            //disini artinya user belum verifikasi tapi mencoba untuk login, jadi musti kita tolak
            response = new ResponseDto({
                message: 'Please verify your email address before login. cheers !',
                code: 200,
            }).response()
            return response
        }

        //disini perlu dibuat generate token jwt
        let token = await generateToken(result.result.id)
        response = new ResponseDto({message: 'success', data: result.result, code: 200}).response()
        response['token'] = token
        return response
    }

    async createUser(data) {
        let result = await this.service.createUser(data)
        if (result.error) {
            //ada error
            return {
                error: result.result,
            }
        }
        //send email into new user
        await sendAccountActivation(data.email, result.result.activationToken)
        let response = new ResponseDto({message: 'success', data: result.result, code: 200}).response()
        return response
    }
    async forgotPasswordUser(targetRedirect, user = {}) {
        let result = await this.service.findOneUserByParams(user)
        if (result.error) {
            //ada error
            return {
                error: result.result,
            }
        }
        //generate password reset token
        let generateToken = await this.service.updateUser(result.result.id, {
            passwordResetToken: randomString(16),
        })
        await sendPasswordReset({
            email: result.result.email,
            token: generateToken.result.passwordResetToken,
            target_redirect: targetRedirect,
        })
        let response = new ResponseDto({message: 'success', data: result.result, code: 200}).response()
        return response
    }
    async updateUserForgotPassword({email, password}) {
        let result = await this.service.findOneUserByParams({email: email})
        if (result.error) {
            //ada error
            return {
                error: result.result,
            }
        }
        let user = await this.service.updateUser(result.result.id, {
            password: password,
            inactive: false, //sekedar berjaga jaga jika ada user baru yang langsung lupa password jadi langsung kita buat aktif usernya
            activationToken: null, //memastikan bahwa aktivation selalu null ketika user berhasil
            passwordResetToken: null, //memastikan bahwa aktivation selalu null ketika user berhasil
        })
        if (user.error) {
            //ada error
            return {
                error: user.result,
            }
        }
        let response = new ResponseDto({message: 'success', data: user.result, code: 200}).response()
        return response
    }
    async setNewPasswordUser({email, password, new_password}) {
        //1. check email ada di database atau tidak
        //2. jika ada check password yang dulu dimasukan benar atau tidak
        //3. update password dengan yang baru

        //1
        let result = await this.service.findOneUserByParams({email: email})
        if (result.error) {
            //ada error
            return {
                error: result.result,
            }
        }
        //2
        const match = await bcrypt.compare(password, result.result.password)
        if (!match) {
            return {
                result: 'password not match !!',
                error: true,
            }
        }
        //3
        let user = await this.service.updateUser(result.result.id, {
            password: new_password,
        })
        if (user.error) {
            //ada error
            return {
                error: user.result,
            }
        }
        let response = new ResponseDto({message: 'success', data: user.result, code: 200}).response()
        return response
    }

    //standart CRUD Collection

    async findUser(limit, page) {
        let result = await this.service.findUser(limit, page)
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
        let response
        if (result.error) {
            //ada error
            response = new ResponseDto({
                message: result.result,
                code: 200,
            }).response()
            return response
        }

        response = new ResponseDto({message: 'success', data: result.result, code: 200}).response()
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

    //end standart CRUD Collection
}
