import express from 'express';
import { login, logout } from '../controllers/authController';
import { createUser } from '../controllers/usersController';

const router = express.Router();

router.post('/login', function(req, res, next) {
    console.log(req.body);
    login(req, res);
});

router.post('/cadastro', (req, res) => {
    createUser(req,res);
});

router.get('/logout', function(req, res, next) {
    logout(req, res);
});

export default router;