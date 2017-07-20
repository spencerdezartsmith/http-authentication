const bcrypt = require('bcrypt')

const comparePasswords = (password, hash) => {
  return bcrypt.compareSync(password, hash)
}

module.exports = { comparePasswords }
