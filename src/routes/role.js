const { Role } = require('../models')
const Response = require('./utilities/response')

module.exports = server => {
  /** LIST */
  server.route({
    method: 'GET',
    path: '/organization/{organizationId}/role',
    handler: async request => {
      const { organizationId } = request.params

      return await Role.findAndCountAll({
        where: { OrganizationId: organizationId },
      })
    },
  })

  /** CREATE */
  server.route({
    method: 'POST',
    path: '/organization/{organizationId}/role',
    /** @todo Validation! */
    handler: async request => {
      const { organizationId } = request.params

      return await Role.create({
        OrganizationId: organizationId,
        ...request.payload,
      })
    },
  })

  /** READ */
  server.route({
    method: 'GET',
    path: '/organization/{organizationId}/role/{roleId}',
    handler: async request => {
      const { roleId, organizationId } = request.params

      const role = await Role.findOne({
        where: { OrganizationId: organizationId, id: roleId },
      })

      if (!role) {
        throw Response.notFound()
      }

      return role
    },
  })

  /** UPDATE */
  server.route({
    method: 'PUT',
    path: '/organization/{organizationId}/role/{roleId}',
    /** @todo Validation! */
    handler: async request => {
      const { roleId, organizationId } = request.params

      const role = await Role.findOne({
        where: { OrganizationId: organizationId, id: roleId },
      })

      if (!role) {
        throw Response.notFound()
      }

      return await role.update(request.payload)
    },
  })

  /** DELETE */
  server.route({
    method: 'DELETE',
    path: '/organization/{organizationId}/role/{roleId}',
    handler: async request => {
      const { roleId, organizationId } = request.params

      const role = await Role.findOne({
        where: { OrganizationId: organizationId, id: roleId },
      })

      if (!role) {
        throw Response.notFound()
      }

      return await role.destroy()
    },
  })
}
