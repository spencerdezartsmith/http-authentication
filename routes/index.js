const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('home', { email: req.session.email })
})

router.get('/login', (req, res) => {
  if (req.session.email) {
    res.redirect('/')
  }
  res.render('login', { success: req.session.success, errors: req.session.errors })
  req.session.errors = null
})

router.get('/signup', (req, res) => {
  res.render('signup', { success: false, errors: req.session.errors })
  req.session.errors = null
})

router.post('/login', (req, res) => {
  req.check('email', 'Please provide a valid email').isEmail()
  req.check('password', 'Password must be between 5 - 12 characters').isLength({ min: 5, max: 12})
  req.check('password', 'Passwords must match').equals(req.body.password2)

  req.getValidationResult()
    .then(errors => {
      if (!errors.isEmpty()) {
        req.session.errors = errors.array()
        req.session.success = false
        res.redirect('/login')
      } else {
        req.session.email = req.body.email
        req.session.success = true
        res.redirect('/')
      }
    })
})

router.post('/signup', (req, res) => {

})

router.post('/logout', (req, res) => {
  req.session = null
  res.redirect('/')
})

module.exports = router
