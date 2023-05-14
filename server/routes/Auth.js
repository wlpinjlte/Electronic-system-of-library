const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')

router.post('/register', AuthController.register)
router.post('/login', AuthController.logIn)
router.post('/refresh-token', AuthController.refreshToken)

module.exports = router