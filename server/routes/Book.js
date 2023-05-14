const express=require("express")
const router=express.Router()

const BooksController=require("../controllers/BookController")
const upload=require("../middleware/upload")

router.get('/',BooksController.getAll)
router.post('/getOne',BooksController.getOne)
router.post('/add',upload.single('file'),BooksController.add)
router.post('/destroy',BooksController.destroy)
router.post('/update',upload.single('file'),BooksController.update)

module.exports=router