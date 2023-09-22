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
  hashed_password: {
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

UserSchema.virtual('password')
  .set(function(password) {
    this._password = password;
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

UserSchema.path('hashed_password').validate(function(v) {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'A senha deve ter no mínimo 6 caracteres.');
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Senha é obrigatória.');
  }
}, null);

// TODO: Verificar se o método update está funcionando
/* UserSchema.pre('update', function(next) {
  this.updated({}, { $set: { updated: new Date() } });
  next();
}); */

UserSchema.methods = {
  authenticate: function(password, callback) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
      if (err) return callback(err);
      callback(null, isMatch);
    })
  },
  encryptPassword: function(password) {
    if (!password) return '';
    bcrypt.hash(password, 10, function(err, hash) {
      if (err) return next(err);
      return hash;
    })
  }
}

module.exports = mongoose.model('User', UserSchema);