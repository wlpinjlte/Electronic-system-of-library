const express = require("express")
const router = express.Router()

const BooksController=require("../controllers/BookController")
const upload = require("../middleware/upload")
const authenticate = require("../middleware/authenticate")
const checkAdminRights = require("../middleware/checkAdminRights")

router.get('/', BooksController.getAll)
router.post('/getOne', BooksController.getOne)
router.post('/add', authenticate, checkAdminRights, upload.single('file'), BooksController.add)
router.post('/destroy', authenticate, checkAdminRights, BooksController.destroy)
router.post('/update', authenticate, checkAdminRights , upload.single('file'), BooksController.update)
router.post('/addOpinion', BooksController.addOpinion)
router.post('/buy', authenticate, BooksController.buy, BooksController.addToHistory)
router.get('/getHistory', authenticate, BooksController.getHistory)
router.post('/getWithFilters',BooksController.getWithFilters)
router.get('/getBestseller',BooksController.getBestSeller)
module.exports = router