'use strict'

const Hapi = require('hapi')
const fs = require('fs')
const path = require('path')
const { host, port } = require('../constants')

/** Initialize server. */
const server = Hapi.Server({ host, port })

const basename = path.basename(__filename)

/** Read route files and invoke w. the server object. */
fs.readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach(file => {
    const route = require(path.join(__dirname, file))
    route(server)
  })

module.exports = server
