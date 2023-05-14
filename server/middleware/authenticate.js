import { verify } from 'jsonwebtoken'

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = verify(token, 'secretToken')
        req.user = decode
        next()
    }
    catch {
        if(error.name == "TokenExpiredError"){
            res.json({message: 'Token expired!'})
        }
        else {
            res.json({message: 'Authentication failed!'})
        }
    }
}

export default authenticate