'use strict'

const { NODE_ENV, HOST, PORT } = process.env

const requiredEnvironmentVariables = []

requiredEnvironmentVariables.forEach(key => {
  if (!process.env[key]) {
    throw Error(`Environment variable "${key}" has not been set. `)
  }
})

module.exports = {
  host: HOST || '127.0.0.1',
  port: PORT || 8080,
  env: NODE_ENV || 'development',
}
