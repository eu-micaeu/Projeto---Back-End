const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
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

  hooks: {

    beforeCreate: async (user) => {

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(user.password, salt);

    },
    
  },

});

module.exports = User;
