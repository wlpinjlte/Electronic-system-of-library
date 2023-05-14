const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
    email: {type: String},
    password: {type: String},
    name: {type: String},
    isAdmin: {type: Boolean}
}, {timestamps: true})

const User = mongoose.model('User', userSchema)
module.exports = User