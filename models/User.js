const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model { }

User.init({

    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

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
  
    timestamps: false

});

module.exports = User;
