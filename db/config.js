let selectEnv = (env) => {
  if (env === 'development') {
    return process.env.DATABASE_URL
  } else if (env === 'test') {
    return process.env.TEST_DATABASE_URL
  }
}

module.exports = { selectEnv }
