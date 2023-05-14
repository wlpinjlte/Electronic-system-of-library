const express =  require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyPraser = require('body-parser')

const cors=require("cors")

mongoose.connect('mongodb+srv://admin:admin@kurs.hwy4owx.mongodb.net/Projekt_bazy?retryWrites=true&w=majority')
const db= mongoose.connection
const booksRouter=require("./routes/Book.js")
const authRouter = require("./routes/Auth.js")

db.on('error',(err)=>{
    console.log(err)
})

db.once('open',()=>{
    console.log("connect dataBase")
})


const app=express()
app.use(cors())

app.use(morgan('dev'))
app.use(bodyPraser.urlencoded({extended:true}))
app.use(bodyPraser.json())
app.use("/uploads",express.static('uploads'))

const PORT = process.env.port || 3000
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})

app.use('/api/books',booksRouter);
app.use('/api/users', authRouter)