const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Route Handlers
app.use(require('./routes/notesRoute'))
app.get('/', (req, res) => res.send('Hello World!'))

// Server Handlers
app.listen(port, () =>
  console.log(`Express Server listening at http://localhost:${port}`),
)
