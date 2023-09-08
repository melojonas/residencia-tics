/* Controle da conta de usuário 
 * 
 * O controlador de usuário é responsável por fazer a ponte entre o banco de dados e o modelo de usuário.
 * Ele é importante para validar os dados de entrada e garantir que sejam inseridos no banco de dados de forma segura.
 * 
 */


const db = require('../db/users');
const User = require('../models/User');

async function createUser(username, password) {
  const newUser = new User(username, password);
  const result = await db.createUser(newUser.username, newUser.password);

  return result;
}

async function findUserByUsername(username) {
  const result = await db.findUserByUsername(username);
}

async function updateUser(id, username, password) {
  const result = await db.updateUser(id, username, password);
}

async function deleteUser(id) {
  const result = await db.deleteUser(id);
}

module.exports = {
  createUser,
  findUserByUsername,
  updateUser,
  deleteUser
};
