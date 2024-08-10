const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
 *       description: User object that needs to be added to the system
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
 *         description: User created successfully
 *       400:
 *         description: Invalid input
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
 *   post:
 *     summary: Autentica um usuário no sistema.
 *     tags: 
 *       - Users
 *     description: Autentica um usuário no sistema.
 *     requestBody:
 *       description: User login credentials
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
 *         description: Successful login
 *       401:
 *         description: Unauthorized
 */
exports.loginUser = async (req, res) => {

  const { username, password } = req.body;

  try {

    const user = await User.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {

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
 *         description: The ID of the user to update
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
 *         description: User updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
exports.updateUser = async (req, res) => {

  const { id } = req.params;

  const { username, password } = req.body;

  try {

    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    if (username) user.username = username;

    if (password) {

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

    }

    await user.save();

    res.json(user);

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
 *         description: The ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
exports.deleteUser = async (req, res) => {

  const { id } = req.params;

  try {

    const user = await User.findByPk(id);
    
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    await user.destroy();

    res.json({ message: 'User deleted' });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }
  
};
