module.exports = {
  'email': {
    isLength: {
      options: [{ min: 1}]
    },
    errorMessage: 'Email field cannot be empty'
  },
  'password': {
    isLength: {
      options: [{ min: 1}]
    },
    errorMessage: 'Password field cannot be empty'
  }
}
