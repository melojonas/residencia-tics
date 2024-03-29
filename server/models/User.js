/* Modelo de usuário */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    default: ''
  },
  email: {
    type: String,
    trim: true,
    unique: 'E-mail já cadastrado',
    match: [/.+\@.+\..+/, 'Por favor, preencha um e-mail válido'],
    required: 'E-mail é obrigatório'
  },
  password: {
    type: String,
    required: 'Senha é obrigatória'
  },
  updated: {
    type: Date,
    default: Date.now
  },
  created: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    enum: ['discente', 'docente', 'coordenacao', 'administracao'],
    default: 'discente'
  },
});

UserSchema.pre('save', async function (next) {
  let user = this;

  if (!user.isModified('password')) return next();

  bcrypt
    .hash(user.password, 10)
    .then((hashedPassword) => {
      user.password = hashedPassword;
      next();
    })
    .catch((err) => {
      console.log(`Error hashing password for user ${user.name}`);
      next(err);
    });
});

UserSchema.methods = {
  authenticate: async function (cadidatePassword) {
    const user = this;
    return bcrypt
      .compare(cadidatePassword, user.password)
      .then((isMatch) => {
        return isMatch;
      })
      .catch((err) => {
        console.log(`Error authenticating user ${user.name}`);
        return false;
      });
  }
};

module.exports = mongoose.model('User', UserSchema);