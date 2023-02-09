const express = require('express')
const controller = require('../controllers/userCont')

const router = express.Router()

//logged in using credentials
router.post('/login', controller.login)
//signing up using credentials
router.post('/signup',controller.signup)

module.exports = router