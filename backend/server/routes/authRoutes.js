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

router.post('/cadastro', (req, res) => {
    userController.createUser(req,res);
});


router.post('/logout', function(req, res, next) {
    authController.logout(req, res);
});

module.exports = router;