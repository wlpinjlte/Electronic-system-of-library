const express=require("express")
const router=express.Router()

const BooksController=require("../controllers/BookController")
const upload=require("../middleware/upload")

router.get('/',BooksController.getAll)
router.get("/getOne",BooksController.getOne)
router.post('/add',upload.single('file'),BooksController.add)
router.post('/destroy',BooksController.destory)
router.post('/update',BooksController.update)

module.exports=router