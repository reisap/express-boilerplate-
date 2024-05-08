import {AbstractRepository} from '../../lib/database/abstract.repository'
const User = require('./users.entity')

export class UsersRepository extends AbstractRepository {
    constructor() {
        super()
        this.model = User
    }
}
