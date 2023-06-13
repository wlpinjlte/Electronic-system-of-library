const mongoose = require('mongoose')
const Schema = mongoose.Schema
const historyElement=new Schema({
    bookId:{type:Object},
    price:{type:Number},
    quantity: {type:Number},
    date: {type:Date}
})
const userSchema = new Schema({
    email: {type: String},
    password: {type: String},
    name: {type: String},
    isAdmin: {type: Boolean},
    history: [historyElement],
    address:{
        street:{type:String},
        number:{type:String},
        place:{type:String}
    }
}, {timestamps: true})

const users = mongoose.model('User', userSchema)
module.exports = users