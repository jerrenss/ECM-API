const express = require('express')
const router = express.Router()

router.get('/api/notes', (req, res) => res.send('Here are the list of notes!'))

router.post('/api/note', (req, res) => {
  console.log(req.body)
  res.sendStatus(404)
})

module.exports = router
