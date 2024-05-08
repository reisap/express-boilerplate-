export class UsersService {
    constructor(repository) {
        this.repository = repository
    }

    async createUser(data) {
        let result = await this.repository.create(data)
        console.log('result === ', result)
        return result
    }
}
