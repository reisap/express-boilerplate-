const {DataTypes, Model} = require('sequelize')
import sequelize from '../../lib/database/database'

class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        content: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        modelName: 'post',
    }
)

//disini perlu dibuat relasi dengan table notif one to one post -> notif
//optional to one notif -> post

module.exports = Post
