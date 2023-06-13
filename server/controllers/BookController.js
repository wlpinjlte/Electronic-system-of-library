// const { response } = require("express")
// const { response } = require("express")
const { response } = require("express")
const mongoose=require("mongoose")
const Books=require("../models/Books")
const Users=require("../models/User")
// const { default: Book } = require("../../electronic-system-of-library/src/components/Book")
// import { ObjectId } from "mongoose"

const getAll=(req,res,next)=>{
    Books.find()
    .then(response=>{
        res.json({
            ...response
        })
    })
    .catch(err=>{
        res.json({
            message:"Error!"
        })
    })
}

const getOne=(req,res,next)=>{
    const id=req.body._id
    Books.findById(id)
    .then(response=>{
        res.json({
            ...response._doc
        })
    })
    .catch(err=>{
        res.json({
            message:"Error!"
        })
    })
}
//title author description onStock id photo price
const add=(req,res,next)=>{
    // console.log(req)
    let book=new Books({
        title:req.body.title,
        author:req.body.author,
        description:req.body.description,
        onStock:req.body.onStock,
        photo:req.body.photo? req.body.photo:"",
        price:req.body.price,
        opinions:[]
    })
    if(req.file){
        book.photo=req.file.path
    }
    book.save()
    .then(response=>{
        res.json({...response._doc})
    })
    .catch(err=>{
        res.json({message:"Error!"})
    })
}

const update=(req,res,next)=>{
    console.log(req)
    const id=req.body._id
    let book={
        title:req.body.title,
        author:req.body.author,
        description:req.body.description,
        onStock:req.body.onStock,
        photo:req.body.photo,
        price:req.body.price
    }
    if(req.file){
        book.photo=req.file.path
    }
    Books.findByIdAndUpdate(id,{$set:book})
    .then(response=>{
        res.json({...book,_id:id})
    })
    .catch(err=>{
        res.json({message:"Error!"})
    })
}

const destroy=(req,res,next)=>{
    let id=req.body._id
    Books.findByIdAndRemove(id)
    .then(response=>{
        res.json({
            message:"Delete succeed!"
        })
    })
    .catch(err=>{
        res.json({message:"Error!"})
    })
}

const addOpinion=(req,res,next)=>{
    let id=req.body._id
    let opinion={
        content:req.body.content,
        rating:req.body.rating,
        author:req.body.author
    }
    Books.updateOne({_id:id},{$push:{opinions:opinion}})
    .then(response=>{
        res.json({...opinion})
    })
    .catch(err=>{
        res.json({message:"Error!"})
    })
}

const buy = (req, res, next) => {
    const promises = []
    for(let book of req.body){
        const promise = Books.findById(book._id)
        promises.push(promise)
    }
    Promise.all(promises)
    .then(responses => {
        for(let i in responses){
            if(responses[i].onStock < req.body[i].quantity){
                return res.json({
                    message: "Not enough units on stock",
                    id: responses[i]._id,
                    onStock: responses[i].onStock
                })
            }
        }

        for(let book of req.body){
            Books.findByIdAndUpdate(book._id, {$inc: {onStock: - book.quantity}}).then()
        }
        next()
    })
    .catch(err => {res.json({message: err})})
}

const addToHistory = (req, res, next) => {
    const date = new Date()
    for(const book of req.body){
        const single = {
            bookId:new mongoose.Types.ObjectId(book._id),
            price: book.price,
            quantity: book.quantity,
            date: date
        }
        Users.updateOne({email: req.user.name}, {$push:{history:single}}).then()
    }
    res.json({message: "Success"})
}

const getHistory = (req, res, next) => {
    Users.aggregate([
        {$match:{
            email: req.user.name
        }},
        {$unwind:"$history"},
        {$addFields: {
           bookIds: "$history.bookId"
        }},
        {$lookup:{
            from:"books",
            localField:"bookIds",
            foreignField:"_id",
            as:"data"
        }},
        {$unwind:"$data"},
        {$project:{
            name:"$data.name",
            title:"$data.title",
            author:"$data.author",
            price:"$history.price",
            date:"$history.date",
            photo:"$data.photo",
            quantity:"$history.quantity"
        }}])
    .then(response => {
        console.log(response)
        res.json({
            data: [...response],
            message: "Success"
        })
    })
    .catch(err => {
        res.json({message: "Error"})
    })
}

const getBestSeller=(req,res,next)=>{
    Users.aggregate([
        {$unwind:"$history"},
        {$addFields: {
           bookIds: "$history.bookId"
        }},
        {$lookup:{
            from:"books",
            localField:"bookIds",
            foreignField:"_id",
            as:"data"
        }},
        {$unwind:"$data"},
        {$group:{
            _id:"$data._id",
            counter:{
                $sum: "$history.quantity"
            }
        }},
        {$sort:{
           counter: -1
        }},
        {$limit: 1},
        {$project:{
            counter: 0
        }}])
        .then(response=>{
            res.json({...response[0]})
        })
        .catch(er=>{
        res.json({message:"Error!"})
    })
}

const getWithFilters=(req,res,next)=>{
    let filters={}
    if(req.body.author){
        filters["author"]=req.body.author
    }
    if(req.body.from){
        filters["price"]={$gt:req.body.from}
    }
    if(req.body.to){
        filters["price"]={...filters["price"],$lt:req.body.to}
    }
    // console.log(filters)
    Books.find(filters,{})
    .then(response=>{
        res.json({
            ...response
        })
    })
    .catch(er=>{
        res.json({message:"Error!"})
    })
}
module.exports={getAll,getOne,add,destroy,update,addOpinion,buy, addToHistory,getWithFilters,getHistory,getBestSeller}
