import express from 'express';

import {
    createUser,
    listUsers,
    getUserById,
    readUser,
    updateUser,
    deleteUser,
    listDiscentes
} from '../controllers/usersController';
import { isAuthenticated } from '../controllers/authController';

const router = express.Router();

// Create and List Users
router.route('/')
    .post(createUser)
    .get(listUsers);

// Read, Update and Delete Users by ID
router.route('/usuario/:user_id')
    .get(readUser)
    .put(updateUser)
    .delete(deleteUser);

// Get only users with role 'discente'
router.route('/discentes')
    .get(listDiscentes);

// Middleware para buscar um usuário pelo ID e armazená-lo no objeto req
router.param('user_id', getUserById);

export default router;