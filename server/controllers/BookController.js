// const { response } = require("express")
// const { response } = require("express")
const Books=require("../models/Books")


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
    let book=new Books({
        title:req.body.title,
        author:req.body.author,
        description:req.body.description,
        onStock:req.body.onStock,
        photo:req.body.photo,
        price:req.body.price
    })
    book.save()
    .then(response=>{
        res.json({...response._doc})
    })
    .catch(err=>{
        res.json({message:"Error!"})
    })
}

const update=(req,res,next)=>{
    const id=req.body._id
    let book={
        title:req.body.title,
        author:req.body.author,
        description:req.body.description,
        onStock:req.body.onStock,
        photo:req.body.photo,
        price:req.body.price
    }
    Books.findByIdAndUpdate(id,{$set:book})
    .then(response=>{
        res.json({...book})
    })
    .catch(err=>{
        res.json({message:"Error!"})
    })
}

const destory=(req,res,next)=>{
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

module.exports={getAll,getOne,add,destory,update}