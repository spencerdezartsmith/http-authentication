const promise = require('bluebird')
const options = { promiseLib: promise }
const { selectEnv } = require('./config')

const pgp = require('pg-promise')(options)

const connection = selectEnv(process.env.NODE_ENV)

const db = pgp(connection)

module.exports = db
