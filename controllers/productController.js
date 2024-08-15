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
 *                 product:
 *                   $ref: '#/components/schemas/Product'
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

  try {
    
    const product = await Product.create({ name, price, description, user_id });

    res.status(201).json({ message: 'Produto criado com sucesso!', product });

  } catch (error) {

    res.status(400).json({ error: error.message });

  }

};
