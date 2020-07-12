const express = require('express')
const router = express.Router()

const { requireSignIn, isAuth, isAdmin } = require('../controllers/auth')

const { userById } = require('../controllers/user')

// router.get('/secret/:userId', requireSignIn, isAuth, isAdmin, (req, res) => {
//   res.json({
//     user: req.profile,
//   })
// })

// router.get('/user/:userId', requireSignin, isAuth, read);
// router.put('/user/:userId', requireSignin, isAuth, update);
// router.get('/orders/by/user/:userId', requireSignin, isAuth, purchaseHistory);

router.param('userId', userById)

module.exports = router
