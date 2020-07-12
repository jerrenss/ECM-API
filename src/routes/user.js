const express = require('express')
const router = express.Router()

const { signUp, signIn } = require('../controllers/user')
const { userSignupValidator } = require('../validators')

router.post('/signup', userSignupValidator, signUp)
router.post('/signin', signIn)

module.exports = router
