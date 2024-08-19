const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model { }

// Modelo de usuário
User.init({

    user_id: { // Coluna de ID

      type: DataTypes.INTEGER,

      autoIncrement: true,

      primaryKey: true,

    },

    username: { // Coluna de nome de usuário

      type: DataTypes.STRING,

      allowNull: false,

      unique: true,

    },

    password: { // Coluna de senha

      type: DataTypes.STRING,

      allowNull: false,

    },

    role: { // Coluna de função

      type: DataTypes.STRING,
      
      defaultValue: 'user',

    },

}, {

    sequelize, // Conexão com o banco de dados
  
    modelName: 'User', // Nome do modelo
  
    timestamps: false // Não cria colunas de data de criação e atualização

});

module.exports = User;
