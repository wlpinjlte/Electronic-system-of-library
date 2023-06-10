const express=require("express")
const router=express.Router()

const BooksController=require("../controllers/BookController")
const upload=require("../middleware/upload")
const authenticate = require("../middleware/authenticate")

router.get('/', BooksController.getAll)
router.post('/getOne', BooksController.getOne)
router.post('/add', authenticate, upload.single('file'), BooksController.add)
router.post('/destroy', authenticate, BooksController.destroy)
router.post('/update', authenticate, upload.single('file'), BooksController.update)
router.post('/addOpinion', BooksController.addOpinion)
router.post('/buy', authenticate, BooksController.buy, BooksController.addToHistory)
router.get('/getHistory', authenticate, BooksController.getHistory)
router.post('/getWithFilters',BooksController.getWithFilters)

module.exports=router