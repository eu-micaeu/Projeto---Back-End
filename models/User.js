const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {}

User.init({

  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  role: {
    type: DataTypes.STRING,
    defaultValue: 'user',
  },

}, {

  sequelize,

  modelName: 'User',

  timestamps: false // Isso desativa a criação dos campos createdAt e updatedAt

});

module.exports = User;
