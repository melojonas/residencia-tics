/* DEPENDÊNCIAS */
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const mongodb = require('mongodb');
const mongoose = require('./database');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const validator = require('validator');
const path = require('path');
const cors = require('cors');
const bcrypt = require("bcrypt");
const createError = require('http-errors');
const ejs = require('ejs');



const indexRoutes = require(path.join(__dirname + '/routes/indexRoutes'));
const authRoutes = require(path.join(__dirname + '/routes/authRoutes'));
const userRoutes = require(path.join(__dirname + '/routes/userRoutes'));

global.__root = path.resolve(__dirname, '..');

/* MIDDLEWARES */
dotenv.config();

mongoose.connect();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    secure: false,
    resave: false,
    saveUninitialized: true,
    cookie: { cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } } // 30 dias
  })
);

app.set('view engine', 'ejs');
app.set('views', path.join(__root + '/client/src/views'));
app.use(flash());
app.use(cors());
app.use(helmet());
app.use(morgan('dev')); // TODO: Mudar para 'combined' em produção
app.use(bodyparser.json( { extended: true } ));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(express.static(path.join(__root + '/client/public')));


/* ROTAS */

// Rota para home
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

/* ERROR HANDLER */

// Error handler para express-jwt
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({"error" : err.name + ": " + err.message})
  } else if (err) {
    res.status(400).json({"error" : err.name + ": " + err.message})
    console.log(err)
  }
})

/* // 404 handler and pass to error handler
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
}); */

module.exports = app;