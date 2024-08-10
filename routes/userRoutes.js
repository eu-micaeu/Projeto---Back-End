const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

router.post('/register', userController.register);

router.post('/login', userController.login);

router.put('/update/:id', authenticate, userController.updateUser);

router.delete('/delete/:id', authenticate, userController.deleteUser);

module.exports = router;
