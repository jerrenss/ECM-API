const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
const dotenv = require('dotenv')
dotenv.config()
const userRoutes = require('./routes/user')

// -----App Init-----
const app = express()
const port = process.env.PORT || 4000

// -----Connect to MongoDB via Mongoose-----
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB Connected'))

mongoose.connection.on('error', (err) => {
  console.log(`DB connection error: ${err.message}`)
})

// -----Middlewares Init-----
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cookieParser())

// -----Route Handlers-----
app.use('/api', userRoutes)
app.get('/', (req, res) => res.send('Hello World!'))

// -----Server Handlers-----
app.listen(port, () =>
  console.log(`Express Server listening at http://localhost:${port}`),
)
