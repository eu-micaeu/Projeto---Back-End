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
 *       401:
 *         description: Operação não permitida.
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: Operação não permitida. 
 */
exports.createAddress = async (req, res) => {

  const { street, number, city, state, user_id } = req.body;

  if (user_id !== req.user_id) {

    return res.status(401).json({ error: 'Operação não permitida.' });
    
  }

  try {

    const address = await Address.create({ street, number, city, state, user_id });

    res.status(201).json({ message: 'Endereço criado com sucesso!', address });

  } catch (error) {

    res.status(400).json({ error: error.message });

  }
  
};


/**
 * @swagger
 * /getAddress/{id}:
 *   get:
 *     summary: Retorna um endereço específico pelo ID.
 *     tags: 
 *       - Addresses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do endereço.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Endereço retornado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 street:
 *                   type: string
 *                 number:
 *                   type: string
 *                 city:
 *                   type: string
 *                 state:
 *                   type: string
 *                 user_id:
 *                   type: integer
 * 
 *       401:
 *         description: Operação não permitida.
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: Operação não permitida. 
 *       404:
 *         description: Endereço não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Endereço não encontrado.
 */
exports.getAddress = async (req, res) => {

  try {

    const address = await Address.findByPk(req.params.id);

    if (!address) {

      return res.status(404).json({ error: 'Endereço não encontrado.' });

    }

    if (address.user_id !== req.user_id) {

      return res.status(401).json({ error: 'Operação não permitida.' });

    }

    res.status(200).json(address);

  } catch (error) {

    res.status(400).json({ error: error.message });

  }

};

/**
 * @swagger
 * /updateAddress/{id}:
 *   put:
 *     summary: Atualiza um endereço existente.
 *     tags: 
 *       - Addresses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do endereço a ser atualizado.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               street:
 *                 type: string
 *               number:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *     responses:
 *       200:
 *         description: Endereço atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Endereço atualizado com sucesso!
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
 *       401:
 *         description: Operação não permitida.
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: Operação não permitida. 
 *       404:
 *         description: Endereço não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Endereço não encontrado.
 */
exports.updateAddress = async (req, res) => {

  const { street, number, city, state } = req.body;

  try {

    const address = await Address.findByPk(req.params.id);

    if (!address) {

      return res.status(404).json({ error: 'Endereço não encontrado.' });

    }

    if (address.user_id !== req.user_id) {

      return res.status(401).json({ error: 'Operação não permitida.' });

    }

    await address.update({ street, number, city, state });

    res.status(200).json({ message: 'Endereço atualizado com sucesso!' });

  } catch (error) {

    res.status(400).json({ error: error.message });

  }

};

/**
 * @swagger
 * /deleteAddress/{id}:
 *   delete:
 *     summary: Deleta um endereço pelo ID.
 *     tags: 
 *       - Addresses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do endereço a ser deletado.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Endereço deletado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Endereço deletado com sucesso!
 *       401:
 *         description: Operação não permitida.
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: Operação não permitida. 
 *       404:
 *         description: Endereço não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Endereço não encontrado.
 */
exports.deleteAddress = async (req, res) => {

  try {

    const address = await Address.findByPk(req.params.id);

    if (!address) {

      return res.status(404).json({ error: 'Endereço não encontrado.' });

    }

    if (address.user_id !== req.user_id) {

      return res.status(401).json({ error: 'Operação não permitida.' });

    }

    await address.destroy();

    res.status(200).json({ message: 'Endereço deletado com sucesso!' });

  } catch (error) {

    res.status(400).json({ error: error.message });

  }

};
