/* DEPENDÊNCIAS */
const express = require("express");
const bcrypt = require("bcryptjs");
const flash = require("flash");
const validator = require("validator");
const path = require("path");
const cors = require("cors");

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

/* MIDDLEWARES */
const app = express();

app.use(
  session({
    secret: "CHRJFfs%#kpRu4VgeR8xN8pyKEpDaHrf#!9&8QTQA",
    secure: false,
    resave: false,
    saveUninitialized: false, // TODO: perguntar se o usuário quer usar cookies antes (LGPD)
    cookie: { maxAge: 60000000 }
  })
);

app.set("view engine", "ejs");

app.use(cors());
app.use(express.json());
app.use(express.bodyParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.methodOverride()); // RESTfull (PUT e DELETE)
app.use(express.static('../client/public'));

// inicializando o passport
app.use(passport.initialize());
app.use(passport.session());

/* ROTAS */

// Rota para login
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);


/* ERROR HANDLER */



/* AUTENTICAÇÃO DE USUÁRIO */

// Estratégia de autenticação local
passport.use(new LocalStrategy(
  (username, password, done) => {
    const user = User.findByUsername(username);

    if (!user || user.password !== password) {
      return done(null, false, { message: 'Nome de usuário ou senha incorreto.' });
    }

    return done(null, user);
  }
));

// Serialização do usuário
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = User.findById(id);
  done(null, user);
});

// Middleware de autenticação
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

// Logout
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/paginainicial'); // TODO: mudar para a página inicial do site
});

