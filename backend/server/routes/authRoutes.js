const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/usersController');

const router = express.Router();

router.post('/login', function(req, res, next) {
    authController.login(req, res);
});

router.get('/refresh', function(req, res, next) {
    authController.refresh(req, res);
});

router.post('/logout', function(req, res, next) {
    authController.logout(req, res);
});

module.exports = router;