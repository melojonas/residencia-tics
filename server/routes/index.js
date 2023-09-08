// indexRoute.js
const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res .type('text/plain')
        .status(200)
        .send('Homepage')
});

module.exports = router;
