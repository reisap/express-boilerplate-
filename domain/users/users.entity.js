const {DataTypes, Model} = require('sequelize')
import sequelize from '../../config/database'

const Post = require('../posts/posts.entity')

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
        },
        inactive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        activationToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        passwordResetToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'user',
    }
)

User.hasMany(Post, {onDelete: 'cascade', foreignKey: 'userId'})
Post.belongsTo(User)

module.exports = User
