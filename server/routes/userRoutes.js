const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { isAuthorized, isAuthenticated } = require('../controllers/authController');

// Create and List Users

router.route('/')
    .post(isAuthenticated, usersController.createUser)
    .get(isAuthenticated, usersController.listUsers);

// Read, Update and Delete Users by ID
router.route('/:user_id')
    .get(isAuthenticated, usersController.readUser)
    .put(isAuthenticated, usersController.updateUser)
    .delete(isAuthenticated, usersController.deleteUser);

// Middleware para buscar um usuário pelo ID e armazená-lo no objeto req
router.param('user_id', usersController.getUserById);

module.exports = router;
