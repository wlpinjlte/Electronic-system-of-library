const mongoose=require("mongoose")
const Schema=mongoose.Schema
//title author description onStock id photo price
const bookSchema=new Schema({
    title:{type:String},
    author:{type:String},
    description:{type:String},
    onStock:{type:Number},
    photo:{type:String},
    price:{type:Number},
    opinions:[]
},{timestamps:true})
const books=mongoose.model('Books',bookSchema)
module.exports=books