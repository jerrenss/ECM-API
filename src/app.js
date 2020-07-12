const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

// -----App Init-----
const app = express()
const port = process.env.PORT || 4000

// -----Connect to MongoDB via Mongoose-----
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))

mongoose.connection.on('error', (err) => {
  console.log(`DB connection error: ${err.message}`)
})

// -----Body Parser Init-----
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// -----Route Handlers-----
app.use(require('./routes/notesRoute'))
app.get('/', (req, res) => res.send('Hello World!'))

// -----Server Handlers-----
app.listen(port, () =>
  console.log(`Express Server listening at http://localhost:${port}`),
)
