const {Sequelize} = require('sequelize')
module.exports = async () => {}

var sequelize

export const database = async () => {
    try {
        sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_ROOT_PASSWORD, {
            host: 'db',
            dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
        })

        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
        return sequelize
    } catch (error) {
        console.error('Unable to connect to the database:', error)
        process.exit(0)
    }
}

exports.sequelize = sequelize
