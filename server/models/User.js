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

UserSchema.methods = {
  authenticate: async function (password) {
    return await bcrypt.compare(password, this.password);
  }
};

module.exports = mongoose.model('User', UserSchema);