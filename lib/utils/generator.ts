import * as crypto from 'crypto'

export const randomString = (length) => {
    return crypto.randomBytes(length).toString('hex').substring(0, length)
}
