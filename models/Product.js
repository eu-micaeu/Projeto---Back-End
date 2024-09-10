const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Product extends Model { }

// Modelo de produto
Product.init({

    product_id: { // Coluna de ID do produto

        type: DataTypes.INTEGER,

        primaryKey: true,

        autoIncrement: true,

    },

    name: { // Coluna de nome do produto

        type: DataTypes.STRING,

        allowNull: false,

    },

    price: { // Coluna de preço do produto

        type: DataTypes.FLOAT,

        allowNull: false,

    },

    description: { // Coluna de descrição do produto

        type: DataTypes.STRING,

        allowNull: false,

    },

    user_id: { // Coluna de ID do usuário

        type: DataTypes.INTEGER,

        allowNull: false,

        references: {

          model: 'Users',

          key: 'user_id',

        }
        
      },

}, {

    sequelize, // Conexão com o banco de dados

    modelName: 'Product', // Nome do model

    timestamps: false // Não cria colunas de data de criação e atualização

});

module.exports = Product;
