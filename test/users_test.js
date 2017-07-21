const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const should = chai.should()
const connection = require('../db/connection')
const db = require('../db/queries')
const query = require('../db/connection')

chai.use(chaiHttp)

beforeEach(function () {
  return query.none('TRUNCATE users')
    .then(function () {
      return db.createNewUser({ email: 'hello@world.com', password: '12345' })
    })
})

describe('User routes', function() {
  it('POST to /signup allows a new user to sign up', function (done) {
    chai.request(app)
      .post('/signup')
      .type('form')
      .send({ email: 'test@test.com', password: '12345', password2: '12345' })
      .end(function(err, res) {
        res.should.have.status(200)
        done()
      })
  })

  it('returns a 400 if someone signs up with invalid data', function (done) {
    chai.request(app)
      .post('/signup')
      .type('form')
      .send({ email: 'test', password: '12345', password2: 'abcd' })
      .end(function (err, res) {
        res.should.have.status(400)
        done()
      })
  })

  it('POST to /login will login a user with the correct credentials', function (done) {
    chai.request(app)
      .post('/login')
      .type('form')
      .send({ email: 'hello@world.com', password: '12345'})
      .end(function (err, res) {
        res.should.have.status(200)
        done()
      })
  })
  it('returns a 401 if a user logs in with incorrect credentials', function (done) {
    chai.request(app)
      .post('/login')
      .type('form')
      .send({ email: 'hello@world.com', password: 'wrong password'})
      .end(function (err, res) {
        res.should.have.status(401)
        done()
      })
  })
})

// Unit tests

describe('#createNewUser', function () {
  it('can add a new user to the database', function () {
    return db.createNewUser({ email: 'testing@test.com', password: '12345' })
      .then(function (result) {
        result.should.be.an('object')
        result.should.have.property('email')
        result.email.should.equal('testing@test.com')
      })
  })
})

describe('#findUserByEmail', function () {
  it('can find a user from the database using an email', function () {
    return db.findUserByEmail('hello@world.com')
      .then(function (result) {
        result.should.be.an('array')
        result[0].should.be.an('object')
        result[0].should.have.property('email')
        result[0].email.should.equal('hello@world.com')
      })
  })
})
