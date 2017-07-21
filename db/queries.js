const bcrypt = require('bcrypt')
const db = require('./connection')

const createNewUser = (data) => {
  const sql = 'INSERT INTO users(email, password) VALUES($1, $2) RETURNING email'
  const saltRounds = 10
  const { email, password } = data
  const hash = bcrypt.hashSync(password, saltRounds)
  return db.one(sql, [email, hash])
}

const findUserByEmail = (email) => {
  return db.any('SELECT * FROM users WHERE email = $1', [email])
}

module.exports = {
  createNewUser,
  findUserByEmail
}
