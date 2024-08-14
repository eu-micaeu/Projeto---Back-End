const express = require('express');
const addressController = require('../controllers/addressController');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

router.post('/createAddress', authenticate, addressController.createAddress);

module.exports = router;