// indexRoute.js
const express = require('express');
const authController = require('../controllers/authController')
const { isAuthenticated, isAuthorized } = require('../controllers/authController');

const router = express.Router();

router.get('/', isAuthenticated, (req, res, next) => {
    authController.login(req, res)
});

module.exports = router;
