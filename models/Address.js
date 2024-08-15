const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Addres extends Model { }

// Modelo de endereço
Addres.init({

    addres_id: {

        type: DataTypes.INTEGER,
        
        primaryKey: true,

        autoIncrement: true,

    },

    street: {

        type: DataTypes.STRING,

        allowNull: false,

    },

    number: {

        type: DataTypes.STRING,

        allowNull: false,

    },

    city: {

        type: DataTypes.STRING,

        allowNull: false,

    },

    state: {

        type: DataTypes.STRING,

        allowNull: false,

    },

    user_id: {

        type: DataTypes.INTEGER,

        allowNull: false,

        references: {

            model: 'Users',

            key: 'user_id',

        }

    }

}, {

    sequelize,

    modelName: 'Addres',

    timestamps: false

});

module.exports = Addres;
