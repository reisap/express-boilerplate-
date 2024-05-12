import {Interface} from 'readline'

export class AbstractRepository {
    public model: any
    constructor() {
        this.model
    }
    async findAll(size: number, number: number) {
        let paramQuerySQL: any = {}
        let limit: number
        let offset: number

        if (size != 0) {
            console.log('masuk limit')
            limit = size
            paramQuerySQL.limit = limit
        }

        if (number != 0) {
            offset = number * limit - limit
            paramQuerySQL.offset = offset
        }

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
