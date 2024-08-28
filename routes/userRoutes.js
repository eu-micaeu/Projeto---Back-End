const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

router.post('/register', userController.registerUser);

router.get('/login', userController.loginUser);

router.put('/updateUser/:id', authenticate, userController.updateUser);

router.delete('/deleteUser/:id', authenticate, userController.deleteUser);

router.post('/createAdmin', authenticate, userController.createAdmin);

router.delete('/deleteUserbyAdmin/:id', authenticate, userController.deleteUserbyAdmin);

router.get('/allUsers', authenticate, userController.allUsers);

router.get('/countUsers', authenticate, userController.countUsers);

router.get('/somePrice/:id', authenticate, userController.somePrice);

module.exports = router;