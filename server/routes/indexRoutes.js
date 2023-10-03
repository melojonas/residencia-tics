// indexRoute.js
const express = require('express');
const { isAuthenticated, isAuthorized } = require('../controllers/authController');

const router = express.Router();

router.get('/', isAuthenticated, function(req, res, next) {
    res.render('home');
});

module.exports = router;
