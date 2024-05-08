import * as bcrypt from 'bcryptjs'

export class UsersService {
    constructor(repository) {
        this.repository = repository
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
        try {
            let result = await this.repository.create({
                ...data,
                password: await bcrypt.hash(data.password, 12),
            })
            return {
                result: result,
                error: false,
            }
        } catch (e) {
            console.log(e)
            return {
                result: e.errors,
                error: true,
            }
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
