const nodemailer = require('nodemailer')
const transporter = require('./email.transporter')
const logger = require('../../../lib/utils/logger')
const config = require('../../../config/config.json')
import {emailTemplateVerification} from './email.template.verification'

const sendAccountActivation = async (email, token, urlActivation = 'http://localhost:3000') => {
    urlActivation = urlActivation + '/api/v1/users/verify?token=' + token
    let html = emailTemplateVerification(urlActivation)
    const info = await transporter.sendMail({
        from: `"Social Media Kekinian <${config.mail.auth.user}>"`,
        to: email,
        subject: 'Account Activation',
        html: html,
    })
    logger.info('url: ' + nodemailer.getTestMessageUrl(info))
}

const sendPasswordReset = async ({email, token, urlActivation = 'http://localhost:3000', target_redirect = 'http://localhost:3000'}) => {
    urlActivation = urlActivation + '/api/v1/users/password-reset?token=' + token
    const info = await transporter.sendMail({
        from: 'My App <MS_gNpaGK@trial-pxkjn41p2q04z781.mlsender.net>',
        to: email,
        subject: 'Password Reset',
        html: `
        <div>
            <b>Please click below link to reset your password</b>
            </div>
            <div>
            <a href="${urlActivation}">Reset Password</a>
        </div>
    `,
    })
    logger.info('url: ' + nodemailer.getTestMessageUrl(info))
}

const sendNewPostToUser = async ({email, content}) => {
    const info = await transporter.sendMail({
        from: 'My App <MS_gNpaGK@trial-pxkjn41p2q04z781.mlsender.net>',
        to: email,
        subject: 'New Post User',
        html: `
        <div>
            <b>Hei New Post from your social media, Check this out !!</b>
            </div>
            <div>
            <p>"${content}"</p>
        </div>
    `,
    })
    logger.info('url: ' + nodemailer.getTestMessageUrl(info))
}

module.exports = {sendAccountActivation, sendPasswordReset, sendNewPostToUser}
