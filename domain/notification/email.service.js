const nodemailer = require('nodemailer')
const transporter = require('./email.transporter')
const logger = require('../../lib/utils/logger')

const sendAccountActivation = async (email, token, urlActivation = 'http://localhost:3000') => {
    const info = await transporter.sendMail({
        from: 'Social Media Kekinian <MS_gNpaGK@trial-pxkjn41p2q04z781.mlsender.net>',
        to: email,
        subject: 'Account Activation',
        html: `
    <div>
      <b>Please click below link to activate your account</b>
    </div>
    <div>
      <a href="${urlActivation}/login?token=${token}">Activate</a>
    </div>
    `,
    })
    logger.info('url: ' + nodemailer.getTestMessageUrl(info))
}

const sendPasswordReset = async (email, token) => {
    const info = await transporter.sendMail({
        from: 'My App <info@my-app.com>',
        to: email,
        subject: 'Password Reset',
        html: `
    <div>
      <b>Please click below link to reset your password</b>
    </div>
    <div>
      <a href="http://localhost:3000/#/password-reset?reset=${token}">Reset</a>
    </div>
    `,
    })
    logger.info('url: ' + nodemailer.getTestMessageUrl(info))
}

module.exports = {sendAccountActivation, sendPasswordReset}
