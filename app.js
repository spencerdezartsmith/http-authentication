require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const expressValidator = require('express-validator')
const app = express()

const mainRoutes = require('./routes')
const userRoutes = require('./routes/users')

app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())

app.use(cookieSession({
  secret: process.env.SECRET,
  maxAge: 0 * 60 * 60 * 1000
}))

app.use(express.static('public'))
app.use(mainRoutes)
app.use(userRoutes)

app.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(500).send(`There was an error: ${err.message}`)
})

app.listen(3000, () => console.log('Gday mate. Can you hear that?? Listening on 3000'))

module.exports = app
