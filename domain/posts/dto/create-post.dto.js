import {z} from 'zod'

export const validateInsertPost = (req, res, next) => {
    try {
        let params = req.body
        const Post = z.object({
            content: z.string().min(5, {message: 'Must be 5 or more characters long'}),
            userId: z.number(),
        })

        Post.parse(params)
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
