/* Modelo de usuário */

const bcrypt = require('bcrypt');

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}

module.exports = User;