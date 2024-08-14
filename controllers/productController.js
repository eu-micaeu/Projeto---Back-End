const Product = require('../models/Product');

exports.createProduct = async (req, res) => {

    const {name, price, description, user_id} = req.body;

    try{

        const product = await Product.create({name, price, description, user_id});

        res.status(201).json({ message: 'Produto criado com sucesso!', product });

    } catch(error) {

        res.status(400).json({ error: error.message });

    }

};
