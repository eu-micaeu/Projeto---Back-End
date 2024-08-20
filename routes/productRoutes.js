const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

router.post('/createProduct', authenticate, productController.createProduct);

router.get('/getProduct/:id', authenticate, productController.getProduct);

router.put('/updateProduct/:id', authenticate, productController.updateProduct);

router.delete('/deleteProduct/:id', authenticate, productController.deleteProduct);

module.exports = router;