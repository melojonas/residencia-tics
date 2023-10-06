// indexRoute.js
const express = require('express');
const { isAuthenticated, isAuthorized } = require('../controllers/authController');

const router = express.Router();

router.get('/', isAuthenticated, (req, res, next) => {
    res.render('home');
});

router.get('/usuarios', isAuthenticated, /* isAuthorized == 'administracao', */ (req, res, next) => {
    res.render('administracao')
})

module.exports = router;
