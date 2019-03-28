'use strict'

const Response = require('./response')

const createRoute = (model, payloadValidationSchema) => server => {
  const modelName = model.options.name.singular.toLowerCase()

  server.route({
    method: 'POST',
    path: `/${modelName}`,
    handler: async request => {
      try {
        const result = await model.create(request.payload)
        return result
      } catch (error) {
        return Response.badRequest()
      }
    },
    options: {
      validate: {
        payload: payloadValidationSchema,
      },
    },
  })
}

const deleteRoute = (model /* options */) => server => {
  const modelName = model.options.name.singular.toLowerCase()
  const identifier = `${modelName}id`

  server.route({
    method: 'DELETE',
    path: `/${modelName}/{${identifier}}`,
    config: {
      pre: [
        {
          method: async request => {
            const id = request.params[identifier]

            const result = await model.findByPk(id)

            if (!result) {
              throw Response.notFound(
                `${model.options.name.singular} not found.`
              )
            }

            return result
          },
          assign: modelName,
        },
      ],
    },
    handler: async request => await request.pre[modelName].destroy(),
  })
}

const listRoute = model => server => {
  const modelName = model.options.name.singular.toLowerCase()
  server.route({
    method: 'GET',
    path: `/${modelName}`,
    handler: async () => await model.findAndCountAll(),
  })
}

const readRoute = model => server => {
  const modelName = model.options.name.singular.toLowerCase()
  const identifier = `${modelName}id`

  server.route({
    method: 'GET',
    path: `/${modelName}/{${identifier}}`,
    config: {
      pre: [
        {
          method: async request => {
            const id = request.params[identifier]

            const result = await model.findByPk(id)

            if (!result) {
              throw Response.notFound(
                `${model.options.name.singular} was not found.`
              )
            }

            return result
          },
          assign: modelName,
        },
      ],
    },
    handler: request => request.pre[modelName],
  })
}

const updateRoute = (model, payloadSchema) => server => {
  const modelName = model.options.name.singular.toLowerCase()
  const identifier = `${modelName}id`

  server.route({
    method: 'PUT',
    path: `/${modelName}/{${identifier}}`,
    config: {
      pre: [
        {
          method: async request => {
            const id = request.params[identifier]

            const result = await model.findByPk(id)

            if (!result) {
              throw Response.notFound(
                `${model.options.name.singular} was not found.`
              )
            }

            return result
          },
          assign: modelName,
        },
      ],
      validate: {
        payload: payloadSchema,
      },
    },
    handler: async request => {
      return await request.pre[modelName].update(request.payload)
    },
  })
}

module.exports = {
  createRoute,
  deleteRoute,
  listRoute,
  readRoute,
  updateRoute,
}
