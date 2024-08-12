const User = require('../models/User');
const sequelize = require('../models/User');

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

    const { username, password } = req.body;

    try {

        await sequelize.sync({ force: true });

        const user = await User.create({ username, password, role: 'admin' });

        // Criando 30 usuários de teste
        for (let i = 0; i < 30; i++) {

            await User.create({ username: `user${i}`, password: `123456`, role: 'user' });
            
        }

        res.status(201).json({ message: 'Banco de dados criado e usuário administrador inserido!', user });

    } catch (error) {

        console.error('Erro:', error);

        res.status(500).json({ error: error.message });

    }

};