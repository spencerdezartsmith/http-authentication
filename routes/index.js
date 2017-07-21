const express = require('express')
const router = express.Router()
const authHelpers = require('./auth_helpers')
const db = require('../db/queries')
const signupSchema = require('./validations/signupSchema')
const loginSchema = require('./validations/loginSchema')

router.get('/', (req, res) => {
  res.render('home', { email: req.session.email, message: req.session.message })
})

module.exports = router
