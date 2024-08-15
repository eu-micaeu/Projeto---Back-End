const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(

  process.env.DB_NAME, // Nome do banco de dados

  process.env.DB_USER, // Usuário

  process.env.DB_PASS, // Senha

  {

    host: process.env.DB_HOST, // Host
    
    dialect: 'postgres', // Dialeto

  }

);

module.exports = sequelize;
