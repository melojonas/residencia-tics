/* Controle da conta de usuário 
 * 
 * O controlador de usuário é responsável por fazer a ponte entre o banco de dados e o modelo de usuário.
 * Ele é importante para validar os dados de entrada e garantir que sejam inseridos no banco de dados de forma segura.
 * 
 */


const db = require('../db/users.js');
const User = require('../models/User');

async function createUser(email, password) {
  const newUser = new User(email, password);
  const result = await db.createUser(newUser.email, newUser.password);

  return result;
}

async function findUserByEmail(email) {
  const result = await db.findUserByEmail(email);
}

async function updateUser(email, password) {
  const result = await db.updateUser(email, password);
}

async function deleteUser(email) {
  const result = await db.deleteUser(email);
}

module.exports = {
  createUser,
  findUserByEmail,
  updateUser,
  deleteUser
};
