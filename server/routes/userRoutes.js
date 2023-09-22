const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { isAuth, requireAuth } = require('../controllers/authController');

// Create and List Users
router.route('/api/users')
    .post(usersController.createUser)
    .get(requireAuth, usersController.listUsers);

// Read, Update and Delete Users by ID
router.route('/api/users/:userID')
    .get(requireAuth, usersController.readUser)
    .put(requireAuth, usersController.updateUser)
    .delete(requireAuth, usersController.deleteUser);

// Middleware para buscar um usuário pelo ID e armazená-lo no objeto req
router.param('userID', usersController.getUserById);

module.exports = router;
