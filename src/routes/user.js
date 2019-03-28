'use strict'

const Joi = require('joi')

const { User } = require('../models')
const {
  createRoute,
  updateRoute,
  deleteRoute,
  listRoute,
  readRoute,
} = require('./utilities/generators')

const updateValidation = Joi.object({
  name: Joi.string()
    .min(3)
    .error(new Error('Name must be at least three characters.'))
    .optional(),
})

const createValidation = Joi.object({
  name: Joi.string()
    .min(3)
    .required(),
  email: Joi.string()
    .email()
    .required(),
})

module.exports = server => {
  listRoute(User)(server)
  createRoute(User, createValidation)(server)
  readRoute(User)(server)
  updateRoute(User, updateValidation)(server)
  deleteRoute(User)(server)
}
