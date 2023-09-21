/* ROTA DE AUTENTICAÇÃO DE USUÁRIO */

const express = require('express');
const passport = require('passport');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'auth-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.Console({ format: winston.format.simple() })
  ]
});

const router = express.Router();

// Jonas: Não lembro o porque dessa rota aqui nesse arquivo
/* router.get('/', (req, res) => {
  res.render('home', { user: req.user });
}); */

router.get('/login', (req, res) => {
  res.render('login', { message: req.flash('loginMessage') });
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

router.post('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.get('/cadastro', (req, res) => {
  res.render('cadastro', { message: req.flash('signupMessage') });
});

router.post('/cadastro', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/cadastro',
  failureFlash: true
}));

module.exports = router;