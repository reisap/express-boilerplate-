import * as bcrypt from 'bcryptjs'
import {sequelize} from '../../lib/database/database'

import {randomString} from '../../lib/utils/generator'

export class UsersService {
    private repository: any
    constructor(repository) {
        this.repository = repository
    }
    async verifyResetPasswordUserByEmail(tokenGenerate) {
        try {
            //seacrh user by token generate
            let user = await this.repository.findOneParams({activationToken: tokenGenerate})
            if (!user || user == null || user == undefined) {
                return {
                    result: 'token activation expired !',
                    error: true,
                }
            }
            // //update status user active
            // let result = await this.repository.update(user.id, {
            //     activationToken: null,
            // })

            return {
                result: user,
                error: false,
            }
        } catch (e) {
            return {
                result: e.errors,
                error: true,
            }
        }
    }
    async verifyUserByEmailToken(tokenGenerate) {
        try {
            //seacrh user by token generate
            let user = await this.repository.findOneParams({activationToken: tokenGenerate})
            if (!user || user == null || user == undefined) {
                return {
                    result: 'token activation expired !',
                    error: true,
                }
            }
            //update status user active
            let result = await this.repository.update(user.id, {
                inactive: false,
                activationToken: null,
            })

            return {
                result: result,
                error: false,
            }
        } catch (e) {
            return {
                result: e.errors,
                error: true,
            }
        }
    }
    async loginUser({email, password}) {
        //find email
        //compare password
        //generate token

        let user = await this.repository.findOneParams({email: email})
        if (!user || user == null || user == undefined) {
            return {
                result: 'Email not found',
                error: true,
            }
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return {
                result: 'password not match !!',
                error: true,
            }
        }

        return {
            result: user,
            error: false,
        }
    }
    async createUser(data) {
        const transaction = await sequelize.transaction()
        try {
            let result = await this.repository.create({
                ...data,
                password: await bcrypt.hash(data.password, 12),
                activationToken: randomString(16),
            })

            await transaction.commit()

            return {
                result: result,
                error: false,
            }
        } catch (e) {
            console.log(e)
            await transaction.rollback()
            return {
                result: e.errors,
                error: true,
            }
        }
    }
    async findOneUserByParams(params = {}) {
        let user = await this.repository.findOneParams(params)
        if (!user || user == null || user == undefined) {
            return {
                result: 'user not found',
                error: true,
            }
        }
        return {
            result: user,
            error: false,
        }
    }
    async findUser(limit, page) {
        try {
            let result = await this.repository.findAll(limit, page)

            return {
                result: result,
                error: false,
            }
        } catch (e) {
            return {
                result: e.errors,
                error: true,
            }
        }
    }
    async findOneUser(id) {
        try {
            let result = await this.repository.findOne(id)

            return {
                result: result,
                error: false,
            }
        } catch (e) {
            return {
                result: e.errors,
                error: true,
            }
        }
    }
    async deleteUser(id) {
        try {
            let result = await this.repository.delete(id)
            if (result == 1) {
                return {
                    result: result,
                    error: false,
                }
            }
            return {
                result: 'Data Not Found',
                error: true,
            }
        } catch (e) {
            return {
                result: e.errors,
                error: true,
            }
        }
    }
    async updateUser(params, paramsBody) {
        try {
            let result = await this.repository.update(params, paramsBody)
            return {
                result: result,
                error: false,
            }
        } catch (e) {
            return {
                result: e.errors,
                error: true,
            }
        }
    }
}
