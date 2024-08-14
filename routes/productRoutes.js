const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

router.post('/createProduct', authenticate, productController.createProduct);

module.exports = router;