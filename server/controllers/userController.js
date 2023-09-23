/* Controle da conta de usuário 
 * 
 * O controlador de usuário é responsável por fazer a ponte entre o banco de dados e o modelo de usuário.
 * Ele é importante para validar os dados de entrada e garantir que sejam inseridos no banco de dados de forma segura.
 * 
 */
const mongoose = require('../database');
const UserSchema = require('../models/UserSchema')
const db = require('../db/users.js');
const bcrypt = require('bcrypt');

async function createUser(email, password) {
  await db.createUser(email, password);
}

async function findUserByEmail(email) {
  await db.findUserByEmail(email);
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