import {AbstractRepository} from '../../lib/database/abstract.repository'
const Post = require('./posts.entity')

export class PostRepository extends AbstractRepository {
    constructor() {
        super()
        this.model = Post
    }
}
