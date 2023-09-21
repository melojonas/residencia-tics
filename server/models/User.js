/* Modelo de usuário */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const ThirdPartyProviderSchema = new mongoose.Schema({
  provider_name: {
    type: String,
    default: null
  },
  provider_id: {
    type: String,
    default: null
  },
  provider_data: {}
});

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
    required: "Senha é obrigatória"
  },
  updated: {
    type: Date,
    default: Date.now
  },
  created: {
    type: Date,
    default: Date.now
  },
  third_party_auth: [ThirdPartyProviderSchema],
  role: {
    type: String,
    enum: ['discente', 'docente', 'coordenacao', 'administracao'],
    default: 'discente'
  },
}, { strict: false });

UserSchema.pre('save', function(next) {
  const user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        user.hashed_password = hash;
        next();
      })
    }
  )} else {
    return next();
  }
})

// TODO: Verificar se o método update está funcionando
/* UserSchema.pre('update', function(next) {
  this.updated({}, { $set: { updated: new Date() } });
  next();
}); */

UserSchema.methods = {
  comparePassword: function(password, callback) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
      if (err) return callback(err);
      callback(null, isMatch);
    })
  }
}

module.exports = mongoose.model('User', UserSchema);