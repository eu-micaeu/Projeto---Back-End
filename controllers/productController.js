const Product = require('../models/Product');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Gerenciamento de produtos
 */

/**
 * @swagger
 * /createProduct:
 *   post:
 *     summary: Cria um novo produto no sistema.
 *     tags: 
 *       - Products
 *     description: Cria um novo produto no sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do produto.
 *                 example: Televisão
 *               price:
 *                 type: number
 *                 description: Preço do produto.
 *                 example: 1299.99
 *               description:
 *                 type: string
 *                 description: Descrição detalhada do produto.
 *                 example: Televisão LED de 40 polegadas.
 *               user_id:
 *                 type: integer
 *                 description: ID do usuário que cadastrou o produto.
 *                 example: 1
 *     responses:
 *       201:
 *         description: Produto criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Produto criado com sucesso!
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
exports.createProduct = async (req, res) => {

  const { name, price, description, user_id } = req.body;

  if (user_id !== req.user_id)  {

    if(req.user.role !== 'admin') {

      return res.status(401).json({ error: 'Operação não permitida.' });

    }

  }

  try {
    
    const product = await Product.create({ name, price, description, user_id });

    res.status(201).json({ message: 'Produto criado com sucesso!', product });

  } catch (error) {

    res.status(400).json({ error: error.message });

  }

};

/**
 * @swagger
 * /getProduct/{id}:
 *   get:
 *     summary: Resgata um produto pelo ID.
 *     tags: 
 *       - Products
 *     description: Retorna um produto específico pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto a ser resgatado.
 *     responses:
 *       200:
 *         description: Produto resgatado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   type: object
 *                   $ref: '#/components/schemas/Product'
 *       401:
 *         description: Operação não permitida.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Operação não permitida. 
 *       404:
 *         description: Produto não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Produto não encontrado.
 */
exports.getProduct = async (req, res) => {

  const { id } = req.params;

  try {

    const product = await Product.findByPk(id);

    if (!product) {

      return res.status(404).json({ error: 'Produto não encontrado.' });

    }

    if (product.user_id !== req.user_id)  {

      if(req.user.role !== 'admin') {

        return res.status(401).json({ error: 'Operação não permitida.' });

      }

    }

    res.status(200).json({ product });

  } catch (error) {

    res.status(400).json({ error: error.message });

  }

};

/**
 * @swagger
 * /updateProduct/{id}:
 *   put:
 *     summary: Atualiza um produto pelo ID.
 *     tags: 
 *       - Products
 *     description: Atualiza as informações de um produto específico pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto a ser atualizado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do produto.
 *               price:
 *                 type: number
 *                 description: Preço do produto.
 *               description:
 *                 type: string
 *                 description: Descrição detalhada do produto.
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Produto atualizado com sucesso!
 *       401:
 *         description: Operação não permitida.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Operação não permitida. 
 *       404:
 *         description: Produto não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Produto não encontrado.
 */
exports.updateProduct = async (req, res) => {

  const { id } = req.params;

  const { name, price, description } = req.body;

  try {

    const product = await Product.findByPk(id);

    if (!product) {

      return res.status(404).json({ error: 'Produto não encontrado.' });

    }

    if (product.user_id !== req.user_id)  {

      if(req.user.role !== 'admin') {

        return res.status(401).json({ error: 'Operação não permitida.' });

      }

    }

    await product.update({ name, price, description });

    res.status(200).json({ message: 'Produto atualizado com sucesso!', product });

  } catch (error) {

    res.status(400).json({ error: error.message });

  }

};

/**
 * @swagger
 * /deleteProduct/{id}:
 *   delete:
 *     summary: Apaga um produto pelo ID.
 *     tags: 
 *       - Products
 *     description: Apaga um produto existente no sistema pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto a ser apagado.
 *     responses:
 *       200:
 *         description: Produto apagado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Produto apagado com sucesso!
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
 *         description: Produto não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Produto não encontrado.
 */
exports.deleteProduct = async (req, res) => {

  const { id } = req.params;

  try {

    const product = await Product.findByPk(id);

    if (!product) {

      return res.status(404).json({ error: 'Produto não encontrado.' });

    }

    if (product.user_id !== req.user_id)  {

      if(req.user.role !== 'admin') {

        return res.status(401).json({ error: 'Operação não permitida.' });

      }

    }

    await product.destroy();

    res.status(200).json({ message: 'Produto apagado com sucesso!' });

  } catch (error) {

    res.status(400).json({ error: error.message });

  }

};