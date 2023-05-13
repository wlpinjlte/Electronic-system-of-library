const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('bcryptjs')
const { token } = require('morgan')

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
        if(err) {
            res.json({error: err})
        }
    })

    let user = new User({
        email: req.body.email,
        password: hashedPass
    })

    user.save()
    .then(user => {
        res.json({message: 'User added successfully!'})
    })
    .catch(error => {
        res.json({message: 'Error!'})
    })
}

const login = (req, res, next) => {
    var email = req.body.email
    var password = req.body.password

    User.findOne({email: email})
    .then(user => {
        if(user) {
            bcrypt.compare(password, user.password, function(err, result) {
                if(err) {
                    res.json({error: err})
                }

                if(result) {
                    let token = jwt.sign({name: user.email}, 'secretToken', {expiresIn: '30s'})
                    let refreshToken = jwt.sign({name: user.email}, 'secretRefreshToken', {expiresIn: '24h'})

                    res.json({
                        message: 'Logged in successfully!',
                        token: token,
                        refreshToken: refreshToken
                    })
                }
                else {
                    res.json({message: 'Wrong password!'})
                }
            })
        }
        else {
            res.json({message: 'No user found!'})
        }
    })
}

const refreshToken = (req, res, next) => {
    const refreshToken = req.body.refreshToken
    jwt.verify(refreshToken, 'secretRefreshToken', function(err, decode) {
        if(err) {
            res.json({error: err})
        }
        else {
            let token = jwt.sign({name: decode.name}, 'secretToken', {expiresIn: '30s'})
            res.json({
                message: 'Token refreshed',
                token: token,
                refreshToken: refreshToken
            })
        }
    })
}

module.exports = {register, login, refreshToken}
