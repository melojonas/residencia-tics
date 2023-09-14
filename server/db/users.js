/* CRUD operations on the users table in the database */

const pool = require('../database');

async function createUser(email, password) {
    const result = await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, password]);
    return result;
}

async function findUserByEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
}

async function updateUser(email, password) {
    const result = await pool.query('UPDATE users SET password = $2 WHERE email = $1', [email, password]);
    return result;
}

async function deleteUser(email) {
    const result = await pool.query('DELETE FROM users WHERE email = $1', [email]);
    return result;
}

module.exports = {
  createUser,
  findUserByEmail,
  updateUser,
  deleteUser
};