const nodemailer = require('nodemailer')
const config = require('../../../config/config.json')

const mailConfig = config.mail

const transporter = nodemailer.createTransport({...mailConfig})

module.exports = transporter
