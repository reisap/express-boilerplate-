import sequelize from '../../config/database'

export class PostService {
    constructor(repository) {
        this.repository = repository
    }
    async createPost(data) {
        const transaction = await sequelize.transaction()
        try {
            let result = await this.repository.create({
                ...data,
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
    async findOnePostByParams(params = {}) {
        let post = await this.repository.findOneParams(params)
        if (!post || post == null || post == undefined) {
            return {
                result: 'post not found',
                error: true,
            }
        }
        return {
            result: post,
            error: false,
        }
    }
    async findPost(limit, page) {
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
    async findOnePost(id) {
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
    async updatePost(id, paramsBody = {}) {
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
    async deletePost(id) {
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
}
