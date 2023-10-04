const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/usersController');
const { log } = require('winston');

const router = express.Router();

router.get('/home', (req, res) => {
    res.render('home');
})

router.get('/login', function(req, res, next) {
    res.render('login');
});

router.post('/login', function(req, res, next) {
    console.log(req.body);

    try {

    authController.login(req, res);

    } catch (error) {
        console.log('Erro');
    }

    }
);

router.get('/cadastro', (req, res) => {
    res.render('cadastro');
});

router.post('/cadastro', function(req, res, next) {
    console.log(req.body);
    userController.createUser(req,res);
});

router.get('/logout', function(req, res, next) {
    authController.logout(req, res);
});

module.exports = router;