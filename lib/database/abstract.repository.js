export class AbstractRepositroy {
    constructor() {
        this.model = null
    }

    async create(data) {
        return await this.model.create(data)
    }

    async find() {
        return await this.model.findAll()
    }
    findOne(id) {}
    update(id) {}
    delete(id) {}
}
