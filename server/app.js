/* DEPENDÊNCIAS */
const express = require('express');
const app = express();
const mongodb = require('mongodb');
const mongoose = require('./database');
const dotenv = require('dotenv');
const bodyparser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('flash');
const validator = require('validator');
const path = require('path');
const cors = require('cors');
const bcrypt = require("bcrypt");
const createError = require('http-errors');
const ejs = require('ejs');
const UserSchema = require ('../server/models/UserSchema');

const indexRoutes = require(path.join(__dirname + '/routes/index'));
const authRoutes = require(path.join(__dirname + '/routes/auth'));

const LocalStrategy = require('passport-local').Strategy;

global.__root = path.resolve(__dirname, '..');

/* MIDDLEWARES */
dotenv.config();


app.set("view engine", "ejs");
app.set("views", path.join(__root + '/client/src/views'));

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('dev')); // TODO: Change to 'combined' for production
app.use(bodyparser.json( { extended: true } ));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(path.join(__root + '/client/public')));

// Configurando a sessão
// const pgPool = new pg.Pool();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    secure: false,
    resave: false,
    saveUninitialized: false,
    cookie: { cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } } // 30 dias
  })
);
 
// Inicializando o passport
app.use(passport.initialize());
app.use(passport.session());

/* ROTAS */

// Rota para home
app.use('/', indexRoutes);
app.use('/', authRoutes);

/* ERROR HANDLER */

// 404 handler and pass to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.send(err);
});

/* AUTENTICAÇÃO DE USUÁRIO */

// Configure Passport.js with Local Strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await userController.findUserByUsername(username);

      if (!user) {
        return done(null, false, { message: 'E-mail ou senha incorreto' });
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: 'E-mail ou senha incorreto' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userController.findUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = app;