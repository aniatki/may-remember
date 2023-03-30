if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: './.env' })
}

// General imports
const express = require('express')
const app = express()
const epxressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

// Import views
const indexRouter = require('./routes/index')
const productsRouter = require('./routes/products')

// Server setup
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(epxressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

// DB setup
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('connected to mongoose'))

// Views setup
app.use('/', indexRouter)
app.use('/products', productsRouter)

// Run server
app.listen(process.env.PORT || 3000)