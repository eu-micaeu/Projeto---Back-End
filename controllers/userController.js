const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Cria um novo usuário no sistema.
 *     tags: 
 *       - Users
 *     description: Cria um novo usuário no sistema.
 *     requestBody:
 *       description:
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
 *         description:
 *       400:
 *         description: 
 */
exports.registerUser = async (req, res) => {

  try {

    const { username, password } = req.body;

    const user = await User.create({ username, password });

    res.status(201).json(user);

  } catch (error) {

    res.status(400).json({ error: error.message });

  }

};

/**
 * @swagger
 * /login:
 *   get:
 *     summary: Autentica um usuário no sistema.
 *     tags: 
 *       - Users
 *     description: Autentica um usuário no sistema.
 *     requestBody:
 *       description:
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
 *       200:
 *         description: 
 *       401:
 *         description: 
 */
exports.loginUser = async (req, res) => {

  const { username, password } = req.body;

  try {

    const user = await User.findOne({ where: { username, password } });

    if (!user) {

      return res.status(401).json({ error: 'Credênciais inválidas' });

    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

/**
 * @swagger
 * /update/{id}:
 *   put:
 *     summary: Atualiza as informações de um usuário no sistema. Requer autenticação.
 *     tags: 
 *       - Users
 *     description: Atualiza as informações de um usuário no sistema. Requer autenticação.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description:
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated user object
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
 *       200:
 *         description: 
 *       400:
 *         description: 
 *       401:
 *         description: 
 *       404:
 *         description: 
 */
exports.updateUser = async (req, res) => {

  const { id } = req.params;

  const { username, password } = req.body;

  try {

    const user = await User.findByPk(id);

    if (!user) {

      return res.status(404).json({ error: 'Usuário não encontrado' });

    }

    if (id !== req.user.id) {

      if (req.user.role !== 'admin') {

        return res.status(401).json({ error: 'Não autorizado' });

      }

      if (username) user.username = username;

      if (password) user.password = password;

      await user.save();

      res.json(user);

    }

  } catch (error) {

    res.status(400).json({ error: error.message });

  }

};

/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     summary: Remove um usuário do sistema. Requer autenticação.
 *     tags: 
 *       - Users
 *     description: Remove um usuário do sistema. Requer autenticação.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description:
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usário deletado
 *       401:
 *         description: 
 *       404:
 *         description: 
 */
exports.deleteUser = async (req, res) => {

  const { id } = req.params;

  try {

    const user = await User.findByPk(id);

    if (!user) {

      return res.status(404).json({ error: 'Usuário não encontrado' });

    }

    if (id !== req.user.id) {

      await user.destroy();

      res.json({ message: 'Usário deletado' });

    }

    return res.status(401).json({ error: 'Não autorizado' });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

/**
 * @swagger
 * /createAdmin:
 *   post:
 *     summary: Cria um novo admin no sistema.
 *     tags: 
 *       - Users
 *     description: Cria um novo admin no sistema.
 *     requestBody:
 *       description:
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
 *         description: 
 *       400:
 *         description: 
 */
exports.createAdmin = async (req, res) => {

  try {

    if (req.user.role !== 'admin') {

      return res.status(401).json({ error: 'Não autorizado' });

    }

    const { username, password } = req.body;

    const user = await User.create({ username, password, role: 'admin' });

    res.status(201).json(user);

  } catch (error) {

    res.status(400).json({ error: error.message });

  }

};

/**
 * @swagger
 * /deleteUserbyAdmin/{id}:
 *   delete:
 *     summary: Apaga um usuário do sistema. Requer autenticação de admin.
 *     tags: 
 *       - Users
 *     description: Apaga um usuário do sistema. Requer autenticação de admin.
 *     requestBody:
 *       description:
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
 *         description: Usário deletado
 *       400:
 *         description: 
 */
exports.deleteUserbyAdmin = async (req, res) => {

  const { id } = req.params;

  try {

    if (req.user.role !== 'admin') {

      return res.status(401).json({ error: 'Não autorizado' });

    }

    const user = await User.findByPk(id);

    if (!user) {

      return res.status(404).json({ error: 'Usuário não encontrado' });

    }

    await user.destroy();

    res.json({ message: 'Usário deletado' });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

/**
 * @swagger
 * /allUsers?limit=x&page=y:
 *   get:
 *     summary: Lista todos os usuários com paginação.
 *     tags: 
 *       - Users
 *     description: Lista todos os usuários com suporte a paginação. É possível definir o limite de registros por página e qual página acessar.
 *     parameters:
 *       - in: query
 *         name: limit
 *         required: true
 *         schema:
 *           type: integer
 *           enum: [5, 10, 30]
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de usuários com base nos parâmetros de paginação
 *       400:
 *         description: Requisição inválida
 */
exports.allUsers = async (req, res) => {

  const { limit, page } = req.query;

  if (![5, 10, 30].includes(parseInt(limit)) || isNaN(parseInt(page)) || parseInt(page) <= 0) {

    return res.status(400).json({ error: 'Parâmetros inválidos. O limite deve ser 5, 10 ou 30 e a página deve ser maior que 0.' });

  }

  const limitValue = parseInt(limit);

  const pageValue = parseInt(page);

  try {

    const users = await User.findAll({

      limit: limitValue,

      offset: (pageValue - 1) * limitValue

    });

    res.status(200).json(users);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

// Função para mostrar a quantidade de users e admins
exports.countUsers = async (req, res) => {

  try {

    const users = await User.count({ where: { role: 'user' } });

    const admins = await User.count({ where: { role: 'admin' } });

    res.json({ users, admins });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};
