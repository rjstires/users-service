'use strict'

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'Role',
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          len: [3],
        },
      },
    },
    {}
  )

  Role.associate = function({ Role, Organization }) {
    Role.belongsTo(Organization)
  }

  return Role
}
