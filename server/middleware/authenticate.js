const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        console.log(token)
        const decode = jwt.verify(token, 'secretToken')
        req.user = decode
        next()
    }
    catch(error) {
        if(error.name == "TokenExpiredError"){            
            res.json({message: 'Token expired!'})
        }
        else {
            res.json({message: 'Authentication failed!'})
        }
    }
}

module.exports = authenticate