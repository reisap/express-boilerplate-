export class AbstractRepository {
    constructor() {
        this.model
    }
    async findAll() {
        console.log('masuk find')
        return await this.model.findAll()
    }
    async create(data) {
        return await this.model.create(data)
    }

    async findOne(id) {
        return await this.model.findOne({where: {id}})
    }
    async update(id, data) {
        let tbl = await this.model.findOne({where: {id}})
        await tbl.update(data)
        await tbl.save()

        return tbl
    }
    async delete(id) {
        return await this.model.destroy({
            where: {
                id,
            },
        })
    }
}
