const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { token } = require('morgan')

const register = (req, res, next) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if(user) {
            res.json({
                message: 'Email is already used',
                result: 'email'
            })
        }
        else {
            bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
                if(err) {
                    res.json({error: err})
                }
                else {
                    let user = new User({
                        email: req.body.email,
                        password: hashedPass,
                        name: req.body.name,
                        isAdmin: false,
                        history:[],
                        address:{
                            street:req.body.street,
                            number:req.body.number,
                            place:req.body.place
                        }
                    })
                
                    user.save()
                    .then(user => {
                        res.json({
                            message: 'User added successfully!',
                            result: 'registered'
                        })
                    })
                    .catch(error => {
                        res.json({
                            message: 'Error!',
                            result: 'error'
                        })
                    })
                }
        
                
            })
        }
    })
    .catch(error=>{
        res.json({
            message: 'Error!',
            result: 'error'
        })
    })
}

const logIn = (req, res, next) => {
    var email = req.body.email
    var password = req.body.password

    User.findOne({email: email})
    .then(user => {
        if(user) {
            bcrypt.compare(password, user.password, function(err, result) {
                if(err) {
                    res.json({
                        message: 'Error!',
                        result: 'error'
                    })
                }

                if(result) {
                    let token = jwt.sign({name: user.email}, 'secretToken', {expiresIn: '2s'})
                    let refreshToken = jwt.sign({name: user.email}, 'secretRefreshToken', {expiresIn: '24h'})

                    res.json({
                        message: 'Logged in successfully!',
                        token: token,
                        refreshToken: refreshToken,
                        name: user.name,
                        isAdmin: user.isAdmin,
                        result: 'loggedIn'
                    })
                }
                else {
                    res.json({
                        message: 'Wrong password!',
                        result: 'password'
                    })
                }
            })
        }
        else {
            res.json({
                message: 'No user found!',
                result: 'user'
            })
        }
    })
}

const refreshToken = (req, res, next) => {
    const refreshToken = req.body.refreshToken
    jwt.verify(refreshToken, 'secretRefreshToken', function(err, decode) {
        if(err) {
            res.json({
                message: 'Error!',
                result: 'error'
            })
        }
        else {
            let token = jwt.sign({name: decode.name}, 'secretToken', {expiresIn: '2s'})
            res.json({
                message: 'Token refreshed',
                token: token,
                refreshToken: refreshToken,
                result: 'refreshed'
            })
        }
    })
}

module.exports = {register, logIn, refreshToken}
