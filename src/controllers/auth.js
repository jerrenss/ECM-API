const User = require('../models/user')
const jwt = require('jsonwebtoken') // Generate signed token
const expressJwt = require('express-jwt') // Authorization check
const { errorHandler } = require('../utils/dbErrorHandler')

exports.signUp = (req, res) => {
  console.log('req.body', req.body)
  const user = new User(req.body)
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({ err: errorHandler(err) })
    }
    user.salt = undefined
    user.hashed_password = undefined
    res.json({ user })
  })
}

exports.signIn = (req, res) => {
  // Find the User based on email
  const { email, password } = req.body
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User with that email does not exist. Please signup',
      })
    }
    // If User is found, make sure the email and password match
    // Create authenticate method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: 'Email and password do not match',
      })
    }
    // Generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    // Persist the token as 't' in cookie with expiry date
    res.cookie('t', token, { expire: new Date() + 9999 })
    // Return response with user and token to frontend client
    const { _id, name, email, role } = user
    return res.json({ token, user: { _id, email, name, role } })
  })
}

exports.signOut = (req, res) => {
  res.clearCookie('t')
  res.json({ message: 'Signout success' })
}

exports.requireSignIn = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'auth',
  algorithms: ['HS256'],
})