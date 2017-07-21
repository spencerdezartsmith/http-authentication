module.exports = {
  'email': {
    isEmail: {
      errorMessage: 'Please provide a valid email'
    }
  },
  'password': {
    isLength: {
      options: [{ min: 5, max: 10 }]
    },
    errorMessage: 'Password must be between 5 - 10 characters'
  }
}
