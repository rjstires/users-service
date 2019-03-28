'use strict'

module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define(
    'Organization',
    {
      name: DataTypes.STRING,
    },
    {}
  )

  Organization.associate = function({ Organization, Role }) {
    Organization.hasMany(Role)
  }

  return Organization
}
