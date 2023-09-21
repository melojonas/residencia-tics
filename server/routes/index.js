// indexRoute.js
const express = require('express');
const router = express.Router();

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

router.get('/', ensureAuthenticated, function(req, res, next) {
    res.render('home');
});

module.exports = router;
