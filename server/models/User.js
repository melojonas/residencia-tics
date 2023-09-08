/* Modelo de usuário */

const bcrypt = require('bcrypt');

class User {
  constructor(username, password) {
    this.username = username;
    this.password = bcrypt.hashSync(password, 10); // Hash the password
  }
}

module.exports = User;