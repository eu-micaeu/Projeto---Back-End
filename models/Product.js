const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Product extends Model { }

Product.init({

    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    price: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    description: {
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
      },

}, {

    sequelize,

    modelName: 'Product',

    timestamps: false

});

module.exports = Product;
