// indexRoute.js
const express = require('express');
const { isAuth, requireAuth } = require('../controllers/authController');

const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('home');
});

module.exports = router;
