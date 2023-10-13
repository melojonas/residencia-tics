import express from 'express';
import authController from '../controllers/authController';
import usersController from '../controllers/usersController';

const router = express.Router();

router.post('/login', function(req, res, next) {
    console.log(req.body);
    authController.login(req, res);
});

router.post('/cadastro', (req, res) => {
    usersController.createUser(req,res);
});

router.get('/logout', function(req, res, next) {
    authController.logout(req, res);
});

export default router;