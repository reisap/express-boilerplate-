export class AbstractRepository {
    public model: any
    constructor() {
        this.model
    }
    async findAll(size, number) {
        let paramQuerySQL: any
        let limit: number
        let offset: number

        if (size !== '' && typeof size !== 'undefined') {
            limit = size
            paramQuerySQL.limit = limit
        }

        if (number !== '' && typeof number !== 'undefined') {
            offset = number * limit - limit
            paramQuerySQL.offset = offset
        }

        console.log(paramQuerySQL)
        return await this.model.findAll(paramQuerySQL)
    }
    async create(data) {
        return await this.model.create(data)
    }

    async findOneParams(object) {
        console.log(object)
        return await this.model.findOne({where: object})
    }

    async findOne(id) {
        return await this.model.findOne({where: {id}})
    }
    async update(id, data) {
        try {
            let tbl = await this.model.findOne({where: {id}})
            await tbl.update(data)
            await tbl.save()

            return tbl
        } catch (e) {
            return e
        }
    }
    async delete(id) {
        return await this.model.destroy({
            where: {
                id,
            },
        })
    }
}
