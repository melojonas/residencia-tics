// indexRoute.js
const express = require('express');
const router = express.Router();

// Rota para index.html in /client
router.get('/', function(req, res, next) {
    res.render('index');
});

module.exports = router;
