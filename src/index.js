'use strict'

const debug = require('debug')('server')
const server = require('./routes')

/** Start server */
server
  .start()
  .then(() => {
    debug(`Server listening at ${server.info.uri}`)
  })
  .catch(err => {
    debug('Server could not be started.', err)
    global.process.exit(1)
  })
