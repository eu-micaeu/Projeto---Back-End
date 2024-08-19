const Address = require('../models/Address');

/**
 * @swagger
 * tags:
 *   name: Addresses
 *   description: Gerenciamento de endereços
 */

/**
 * @swagger
 * /createAddress:
 *   post:
 *     summary: Cria um novo endereço no sistema.
 *     tags: 
 *       - Addresses
 *     description: Cria um novo endereço no sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               street:
 *                 type: string
 *                 description: Rua do endereço.
 *                 example: Rua das Flores
 *               number:
 *                 type: string
 *                 description: Número do endereço.
 *                 example: 123
 *               city:
 *                 type: string
 *                 description: Cidade do endereço.
 *                 example: São Paulo
 *               state:
 *                 type: string
 *                 description: Estado do endereço.
 *                 example: SP
 *               user_id:
 *                 type: integer
 *                 description: ID do usuário associado ao endereço.
 *                 example: 1
 *     responses:
 *       201:
 *         description: Endereço criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Endereço criado com sucesso!
 *       400:
 *         description: Erro na requisição.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error message.
 */
exports.createAddress = async (req, res) => {

  const { street, number, city, state, user_id } = req.body;

  try {

    const address = await Address.create({ street, number, city, state, user_id });

    res.status(201).json({ message: 'Endereço criado com sucesso!', address });

  } catch (error) {

    res.status(400).json({ error: error.message });

  }
  
};
