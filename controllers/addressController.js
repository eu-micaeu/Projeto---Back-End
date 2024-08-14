const Address = require('../models/Address');

exports.createAddress = async (req, res) => {

    const {street, number, city, state, user_id} = req.body;

    try{

        const address = await Address.create({street, number, city, state, user_id});

        res.status(201).json({ message: 'Endereço criado com sucesso!', address });

    } catch(error) {

        res.status(400).json({ error: error.message });

    }

};
