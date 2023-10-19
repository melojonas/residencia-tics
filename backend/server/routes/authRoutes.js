const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/usersController');
const User = require('../models/User');
const { log } = require('winston');

const router = express.Router();


router.post('/login', function(req, res, next) {
    console.log(req.body);

    const user = User.findOne({email: req.body.email})

    try {
        authController.login(req, res);

    } catch (error) {
        console.log('Erro');
    }
});

router.get('/returndatatoken', (req, res) => {
    authController.returnDataToken(req, res)
});

router.post('/cadastro', (req, res) => {
    console.log(req.body);
    userController.createUser(req,res);
});


router.get('/logout', function(req, res, next) {
    authController.logout(req, res);
});

module.exports = router;