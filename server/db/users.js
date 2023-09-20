/* CRUD operations on the users table in the database */

const mongoose = require ('../database');
const User = require('../models/User');

async function createUser(email, password) {
  const user = new User({ email, password });
  await user.save();
  return user;
}

async function findUserByEmail(email) {
  
}

async function updateUser(email, password) {

}

async function deleteUser(email) {

}

module.exports = {
  createUser,
  findUserByEmail,
  updateUser,
  deleteUser
};