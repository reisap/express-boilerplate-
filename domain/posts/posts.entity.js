const {DataTypes, Model} = require('sequelize')
import sequelize from '../../config/database'

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

module.exports = Post
