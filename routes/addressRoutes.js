const express = require('express');
const addressController = require('../controllers/addressController');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

router.post('/createAddress', authenticate, addressController.createAddress);

router.get('/getAddress/:id', authenticate, addressController.getAddress);

router.get('/updateAddress/:id', authenticate, addressController.updateAddress);

router.delete('/deleteAddress/:id', authenticate, addressController.deleteAddress);

module.exports = router;