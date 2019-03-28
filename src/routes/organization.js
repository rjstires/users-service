'use strict'

const Joi = require('joi')

const { Organization } = require('../models')
const {
  createRoute,
  listRoute,
  deleteRoute,
  readRoute,
  updateRoute,
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
    .error(new Error('Name must be at least three characters.')),
})

module.exports = server => {
  listRoute(Organization)(server)
  createRoute(Organization, createValidation)(server)
  readRoute(Organization)(server)
  updateRoute(Organization, updateValidation)(server)
  deleteRoute(Organization)(server)
}
