/* ROTA DE AUTENTICAÇÃO DE USUÁRIO */

const express = require('express');
const passport = require('passport');
const User = require('../models/user');

const router = express.Router();

router.post('/login', passport.authenticate('local', {
  successRedirect: '/painel', // TODO: mudar para a página inicial do painel
  failureRedirect: '/login',
  failureFlash: true
}));

router.post('/cadastro', (req, res) => {
    // TODO: implementar cadastro de usuário
});

module.exports = router;
