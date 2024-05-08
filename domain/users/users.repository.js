import {AbstractRepositroy} from '../../lib/database/abstract.repository'
const User = require('./users.entity')

export class UsersRepository {
    constructor() {
        this.model = User
    }
}
