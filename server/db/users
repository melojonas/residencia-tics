/* CRUD operations on the users table in the database */

const pool = require('../database');

async function createUser(username, password) {
    const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, password]);
    return result;
}

async function findUserByUsername(username) {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
}

async function updateUser(username, password) {
    const result = await pool.query('UPDATE users SET password = $2 WHERE username = $1', [username, password]);
    return result;
}

async function deleteUser(username) {
    const result = await pool.query('DELETE FROM users WHERE username = $1', [username]);
    return result;
}

module.exports = {
  createUser,
  findUserByUsername,
  updateUser,
  deleteUser
};