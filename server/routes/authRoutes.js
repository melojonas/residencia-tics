const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/login', function(req, res, next) {
    res.render('login');
});

router.post('/login', function(req, res, next) {
    console.log(req.body);
    authController.login(req, res);
});

router.get('/logout', function(req, res, next) {
    authController.logout(req, res);
});

module.exports = router;