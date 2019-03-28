'use strict'

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          len: [3],
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
    },
    {}
  )

  User.associate = function(/* models */) {
    // associations can be defined here
  }

  return User
}
