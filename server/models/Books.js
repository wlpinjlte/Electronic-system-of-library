const mongoose=require("mongoose")
const Schema=mongoose.Schema
//title author description onStock id photo price
const opinion=new Schema({
    content:{type:String},
    rating:{type:Number},
    author:{type:String}
})
const bookSchema=new Schema({
    title:{type:String},
    author:{type:String},
    description:{type:String},
    onStock:{type:Number},
    photo:{type:String},
    price:{type:Number},
    opinions:[opinion]
},{timestamps:true})
const books=mongoose.model('Books',bookSchema)
module.exports=books