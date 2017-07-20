const express = require('express')
const router = express.Router()
const authHelpers = require('./auth_helpers')
const db = require('../db/queries')
const signupSchema = require('./validations/signupSchema')
const loginSchema = require('./validations/loginSchema')

router.get('/', (req, res) => {
  res.render('home', { email: req.session.email, message: req.session.message })
})

router.get('/login', (req, res) => {
  if (req.session.email) {
    res.redirect('/')
  }
  res.render('login', { errors: req.session.errors, message: req.session.message })
  req.session.errors = null
  req.session.message = null
})

router.get('/signup', (req, res) => {
  if (req.session.email) {
    res.redirect('/')
  }
  res.render('signup', { errors: req.session.errors })
  req.session.errors = null
  req.session.message = null
})

router.post('/login', (req, res, next) => {
  const { email, password } = req.body
  req.checkBody(loginSchema)

  req.getValidationResult()
    .then(errors => {
      if (!errors.isEmpty()) {
        req.session.errors = errors.array()
        res.redirect('/login')
      } else {
        db.findUserByEmail(email)
          .then(foundUser => {
            req.session.errors = null
            if (foundUser.length === 0) {
              req.session.message = 'No record of those login credentials'
              res.redirect('/login')
            } else {
              if (!authHelpers.comparePasswords(password, foundUser[0].password)) {
                req.session.message = 'Incorrect Password!'
                res.redirect('/login')
              } else {
                req.session.email = email
                req.session.message = 'You are successfully logged in! '
                res.redirect('/')
              }
            }
          })
          .catch(error => {
            res.status(500).render('error', { error })
          })
      }
    })
  })

router.post('/signup', (req, res, next) => {
  req.checkBody(signupSchema)
  req.check('password', 'Passwords must match').equals(req.body.password2)

  req.getValidationResult()
    .then(errors => {
      if (!errors.isEmpty()) {
        req.session.errors = errors.array()
        res.redirect('/signup')
      } else {
        db.createNewUser(req.body)
          .then(result => {
            req.session.email = result.email
            req.session.message = 'Thank you for signing up. You are now logged in!'
            res.redirect('/')
          })
          .catch(error => {
            res.status(500).render('error', { error })
          })
      }
    })
})

router.post('/logout', (req, res) => {
  req.session = null
  res.redirect('/')
})

module.exports = router
