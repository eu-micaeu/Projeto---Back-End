const express = require('express');
const { sequelize } = require('../models/User'); 
const router = express.Router();

router.get('/install', async (req, res) => {

  try {

    await sequelize.sync({ force: true });
    
    res.json({ message: 'Banco de dados feito!' });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});

module.exports = router;
