import sequelize from '../../lib/database/database'

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
            //check userId apakah dia yang buat post atau tidak
            let check_post = await this.repository.findOne(id)

            if (check_post.userId != paramsBody.userId) {
                //error dia tidak berhak edit karena bukan punya dia post ini
                return {
                    result: 'Not Allowed Edit Post',
                    error: true,
                }
            }

            let result = await this.repository.update(id, paramsBody)
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
    async deletePost(id, userId) {
        try {
            //check userId apakah dia yang buat post atau tidak
            let check_post = await this.repository.findOne(id)

            if (check_post.userId != userId) {
                //error dia tidak berhak edit karena bukan punya dia post ini
                return {
                    result: 'Not Allowed Delete Post',
                    error: true,
                }
            }
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
