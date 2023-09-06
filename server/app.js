/* DEPENDÊNCIAS */
const express = require("express");
const bcrypt = require("bcryptjs");
const flash = require("flash");
const validator = require("validator");
const path = require("path");
const cors = require("cors");
const pg = require("pg");
const session = require('express-session');
const PostgresSession = require('connect-pg-simple')(session);
const passport = require('passport');

/* MIDDLEWARES */
const app = express();

// Configurando a sessão
const pgPool = new pg.Pool({ // TODO: criar variáveis de ambiente para as configurações do banco de dados
    user: DB_USER,
    password: DB_PASS,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME
});

app.use(
  session({
    store: new PostgresSession({
      pool: pgPool,
      tableName: "session" // TODO: criar tabela para armazenar sessões
    }),
    secret: process.env.SESSION_SECRET, // TODO: criar variável de ambiente para a secret
    secure: false,
    resave: false,
    saveUninitialized: false,
    cookie: { cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } } // 30 dias
  })
);

// Inicializando o passport
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/* app.use(express.methodOverride()); // RESTfull (PUT e DELETE) */ 
app.use(express.static('../client/public'));

app.use(function(req, res, next) {
  var msgs = req.session.messages || [];
  res.locals.messages = msgs;
  res.locals.hasMessages = !! msgs.length;
  req.session.messages = [];
  next();
});
app.use(function(req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  next();
});

/* ROTAS */

// Rota para login
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);


/* ERROR HANDLER */

// Catch 404
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/* AUTENTICAÇÃO DE USUÁRIO */

// Middleware de autenticação
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.export = app;
