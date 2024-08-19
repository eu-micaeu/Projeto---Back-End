const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Addres extends Model { }

// Modelo de endereço
Addres.init({

    addres_id: { // Coluna de ID do endereço

        type: DataTypes.INTEGER,
        
        primaryKey: true,

        autoIncrement: true,

    },

    street: { // Coluna de rua do endereço

        type: DataTypes.STRING,

        allowNull: false,

    },

    number: { // Coluna de número do endereço

        type: DataTypes.STRING,

        allowNull: false,

    },

    city: { // Coluna de cidade do endereço

        type: DataTypes.STRING,

        allowNull: false,

    },

    state: { // Coluna do estado do endereço

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

    }

}, {

    sequelize, // Conexão com o banco de dados

    modelName: 'Addres', // Nome do modelo

    timestamps: false // Não cria colunas de data de criação e atualização

});

module.exports = Addres;
