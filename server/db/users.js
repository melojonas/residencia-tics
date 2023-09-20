/* CRUD operations on the users table in the database */

const mongoose = require ('../database');
const UserSchema = require('../models/UserSchema');

async function createUser(email, password) {

    const User = mongoose.model('usuarios');

    await new User({
        email: email,
        password: password
    }).save();
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