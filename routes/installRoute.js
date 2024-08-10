const express = require('express');
const { sequelize } = require('../models/User'); 
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Install
 *   description: Instalação do sistema
 */

/**
 * @swagger
 * /install:
 *   post:
 *     summary: Cria ou sincroniza o banco de dados.
 *     tags: 
 *       - Install
 *     description: Cria ou sincroniza o banco de dados.
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
 *         description: Banco de dados feito!
 *       500:
 *         description: Erro ao criar o banco de dados
 */
router.get('/install', async (req, res) => {

  try {

    await sequelize.sync({ force: true });
    
    res.json({ message: 'Banco de dados feito!' });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});

module.exports = router;
