/* ROTA DE AUTENTICAÇÃO DE USUÁRIO */

const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
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

router.post('/cadastro', async (req, res) => {

  var email = req.body.email;
  var password = req.body.password;

  const salt = await bcrypt.genSalt(10)
  password = await bcrypt.hash(password, salt);

  try {
   await userController.createUser(email, password);
    // res.status(201).json({ message: 'Usuário criado com sucesso'});
    res.redirect('login')
  } catch (error) {
    res.status(500).json({ error: 'Falha ao criar usuário' });
  }
});

module.exports = router;