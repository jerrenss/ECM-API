const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
const expressValidator = require('express-validator')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const orderRoutes = require('./routes/order')

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
app.use(expressValidator())
app.use(cors())

// -----Route Handlers-----
app.get('/', (req, res) => res.send('Hello World!'))
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)
app.use('/api', orderRoutes)

// -----Server Handlers-----
app.listen(port, () =>
  console.log(`Express Server listening on http://localhost:${port}`),
)
