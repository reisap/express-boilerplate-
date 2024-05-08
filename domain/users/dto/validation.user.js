import {z} from 'zod'

export const validateInsertUser = (req, res, next) => {
    try {
        let params = req.body
        const User = z.object({
            username: z.string().min(5, {message: 'Must be 5 or more characters long'}),
            password: z.string().min(5, {message: 'Must be 5 or more characters long'}),
            email: z.string().email({message: 'Invalid email address'}),
        })

        User.parse(params)
        next()
    } catch (e) {
        let error = JSON.parse(e)
        error = {
            success: false,
            code: 500,
            message: 'Error',
            error: error,
        }
        res.status(500).json(error)
    }
}
