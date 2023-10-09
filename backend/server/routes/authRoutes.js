const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/usersController');
const User = require('../models/User');
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

    const user = User.findOne({email: req.body.email})

    try {
        authController.login(req, res);

    } catch (error) {
        console.log('Erro');
    }

    }
);


router.post('/cadastro', (req, res) => {
    console.log(req.body);
    userController.createUser(req,res);
});

router.get('/diarioadm', (req, res) => {
    res.render('diarioadm');
});

router.get('/presencaadm', (req, res) => {
    res.render('presencaadm');
});

router.get('/administracao', (req, res) => {   
    res.render('administracao');
});

router.get('/diario', (req, res) => {
    res.render('diario');
});

router.get('/presenca', (req, res) => {
    res.render('presenca');
});


router.get('/logout', function(req, res, next) {
    authController.logout(req, res);
});

module.exports = router;