/* ROTA DE AUTENTICAÇÃO DE USUÁRIO */

const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/', ensureAuthenticated, (req, res) => {
  res.render('index', { user: req.user });
});

router.get('/login', (req, res) => {
  res.render('login')
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureMessage: true
}));

router.post('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.get('/cadastro', (req, res) => {
  res.render('cadastro');
});

router.post('/cadastro', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/cadastro',
  failureFlash: true
}));

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;