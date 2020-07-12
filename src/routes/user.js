const express = require('express')
const router = express.Router()

const { signUp } = require('../controllers/user')
const { userSignupValidator } = require('../validators')

router.post('/signup', userSignupValidator, signUp)

module.exports = router
