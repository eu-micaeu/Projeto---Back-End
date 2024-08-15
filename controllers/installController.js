const sequalize = require('../config/database');
const User = require('../models/User');
const Product = require('../models/Product');
const Address = require('../models/Address');

/**
 * @swagger
 * tags:
 *   name: Install
 *   description: Instalação do sistema
 */

/**
 * @swagger
 * /install:
 *   get:
 *     summary: Cria o banco de dados e cria um usuário administrador.
 *     tags: 
 *       - Install
 *     description: Cria o banco de dados e cria um usuário administrador.
 *     requestBody:
 *      description: 
 *       required: true 
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Banco de dados criado e usuário administrador inserido.
 *       500:
 *         description: Erro ao criar o banco de dados ou o usuário administrador
 */
exports.install = async (req, res) => {

    try {

        await sequalize.sync({ force: true });

        const usuario = await User.create({ username: 'admin', password: 'admin', role: 'admin' });

        await User.bulkCreate([
            { username: 'joaoRefrigeracao', password: 'frioGelado123', role: 'user' },
            { username: 'mariaLavagem', password: 'limpezaTotal', role: 'user' },
            { username: 'carlosCozinha', password: 'chefDeCasa', role: 'user' },
            { username: 'anaTvSom', password: 'cinemaEmCasa', role: 'user' },
            { username: 'pedroEletro', password: 'energiaTotal', role: 'user' }
        ]);

        await Product.bulkCreate([
            { name: 'Geladeira Frost Free', price: '1200.00', description: 'Geladeira usada, com função Frost Free.', user_id: usuario.user_id },
            { name: 'Máquina de Lavar 10kg', price: '800.00', description: 'Máquina de lavar seminova, capacidade para 10kg.', user_id: usuario.user_id + 1 },
            { name: 'Fogão 4 Bocas', price: '400.00', description: 'Fogão usado, 4 bocas com acendimento automático.', user_id: usuario.user_id + 2 },
            { name: 'TV LED 42"', price: '900.00', description: 'TV LED de 42 polegadas, ótima para a sala de estar.', user_id: usuario.user_id + 3 },
            { name: 'Micro-ondas 20L', price: '250.00', description: 'Micro-ondas usado, capacidade de 20 litros.', user_id: usuario.user_id + 4 }
        ]);

        await Address.bulkCreate([
            { street: 'Rua dos Eletros', number: '101', city: 'Recife', state: 'Pernambuco', user_id: usuario.user_id },
            { street: 'Avenida das Lavadoras', number: '202', city: 'São Paulo', state: 'São Paulo', user_id: usuario.user_id + 1 },
            { street: 'Travessa dos Fogões', number: '303', city: 'Belo Horizonte', state: 'Minas Gerais', user_id: usuario.user_id + 2 },
            { street: 'Rua das Telas', number: '404', city: 'Rio de Janeiro', state: 'Rio de Janeiro', user_id: usuario.user_id + 3 },
            { street: 'Avenida dos Micro-ondas', number: '505', city: 'Curitiba', state: 'Paraná', user_id: usuario.user_id + 4 }
        ]);

        res.status(201).json({ message: 'Banco de dados criado e usuário administrador inserido!' });

    } catch (error) {

        console.error('Erro:', error);

        res.status(500).json({ error: error.message });

    }

};
