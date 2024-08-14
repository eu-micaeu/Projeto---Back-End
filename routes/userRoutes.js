const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

router.post('/register', userController.registerUser);

router.get('/login', userController.loginUser);

router.put('/update/:id', authenticate, userController.updateUser);

router.delete('/delete/:id', authenticate, userController.deleteUser);

router.post('/createAdmin', authenticate, userController.createAdmin);

router.delete('/deleteUserbyAdmin/:id', authenticate, userController.deleteUserbyAdmin);

router.get('/allUsers', authenticate, userController.allUsers);

router.get('/countUsers', authenticate, userController.countUsers);

module.exports = router;