import express from 'express';

import usersController from '../controllers/usersController';
import { isAuthenticated } from '../controllers/authController';

const router = express.Router();

// Create and List Users

/**
 * @api {post} /users Create a new user
 * @apiName CreateUser
 * @apiGroup User
 * 
 * @apiParam {String} [name] User's name.
 * @apiParam {String} [email] User's email.
 * @apiParam {String} [password] User's password.
 * 
 * @apiSuccess {Object} user User object.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 CREATED
 *     { message: 'Usuário cadastrado com sucesso!' }
 */

/**
 * @api {get} /users Get all users
 * @apiName ListUsers
 * @apiGroup User
 * 
 * @apiSuccess {Object[]} users List of user objects.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "name": "John Doe",
 *         "email": "johndoe@example.com
 *        },
 *        {
 *         "name": "Jane Doe",
 *         "email": "janedoe@example.com
 *         }
 *     ]
 */

router.route('/')
    .post(usersController.createUser)
    .get(usersController.listUsers);

// Read, Update and Delete Users by ID
/**
 * @api {put} /users/:user_id Update a user by ID
 * @apiName UpdateUser
 * @apiGroup User
 * 
 * @apiParam {String} user_id User's ID.
 * 
 * @apiSuccess {Object} user User object.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "name": "John Doe",
 *       "email": "johndoe@example.com",
 *       "role": "discente",
 *       "created": "2021-01-01T00:00:00.000Z",
 *       "updated": "2021-01-01T00:00:00.000Z",
 *     }
 */

/**
 * @api {delete} /users/:user_id Delete a user by ID
 * @apiName DeleteUser
 * @apiGroup User
 * 
 * @apiParam {String} user_id User's ID.
 * 
 * @apiSuccess {Object} user User object.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     { message: 'Usuário removido com sucesso!' }
 */

/**
 * @api {get} /users/:user_id Get a user by ID
 * @apiName GetUser
 * @apiGroup User
 * 
 * @apiParam {String} [user_id] User's ID.
 * 
 * @apiSuccess {Object} user User object.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "name": "John Doe",
 *       "email": "johndoe@example.com",
 *       "role": "discente",
 *       "created": "2021-01-01T00:00:00.000Z",
 *       "updated": "2021-01-01T00:00:00.000Z",
 *     }
 */

router.route('/:user_id')
    .get(isAuthenticated, usersController.readUser)
    .put(isAuthenticated, usersController.updateUser)
    .delete(isAuthenticated, usersController.deleteUser);

// Middleware para buscar um usuário pelo ID e armazená-lo no objeto req
router.param('user_id', usersController.getUserById);

export default router;