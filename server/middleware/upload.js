const path=require("path")
const multer=require("multer")

var storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

var upload=multer({
    storage:storage,
    fileFilter:(req,file,callback)=>{
        if(file.mimetype=="image/png"||file.mimetype=="image/jpg"||file.mimetype=="image/jpeg"){
            callback(null,true)
        }else{
            console.log("Only jpg & png")
            callback(null,false)
        }
    },
    limits:{
        fileSize: 1024*1024*2
    }
})

module.exports=upload