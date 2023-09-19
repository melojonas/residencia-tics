/* Controle da conta de usuário 
 * 
 * O controlador de usuário é responsável por fazer a ponte entre o banco de dados e o modelo de usuário.
 * Ele é importante para validar os dados de entrada e garantir que sejam inseridos no banco de dados de forma segura.
 * 
 */

const { run } = require('../database')
const db = require('../db/users.js');
const User = require('../models/User');
const bcrypt = require('bcrypt');

async function createUser(email, password) {
  const newUser = new User(email, password);
  await db.createUser(newUser.email, newUser.password);

  const banco = "gestaoacademica";
  const documento = "users";
  const data = {
      email: email,
      password: password,
  };
  await run(inserir=true, procurar=false, atualizar=false, deletar=false, banco, documento, data);
}

async function findUserByEmail(email) {
  const result = await db.findUserByEmail(email);
}

async function updateUser(email, password) {
  await db.updateUser(email, password);
}

async function deleteUser(email) {
  await db.deleteUser(email);
}

module.exports = {
  createUser,
  findUserByEmail,
  updateUser,
  deleteUser
};
