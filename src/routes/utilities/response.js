'use strict'

const Boom = require('boom')

module.exports = {
  notFound: (message, data) => {
    return Boom.notFound(message, data)
  },
  badData: (message, data) => {
    return Boom.badData(message, data)
  },
  badRequest: (message, data) => {
    return Boom.badRequest(message, data)
  },
}
