/* CRUD operations on the users table in the database */

const pool = require('../database');

async function createUser(email, password) {
    const data = {
        email: email,
        password: password
    };
    const result = await pool.run(inserir=true, procurar=false, atualizar=false, deletar=false, gestaoacademica, users, data);
    return result;
}

async function findUserByEmail(email) {
    const data = {
        email: email
    }
    const result = await pool.run(inserir=false, procurar=true, atualizar=false, deletar=false, gestaoacademica, users, data)
    return result.rows[0];
}

async function updateUser(email, password) {
    const data = {
        email: email,
        password: password
    };
    const result = await pool.run(inserir=false, procurar=false, atualizar=true, deletar=false, gestaoacademica, users, data);
    return result;
}

async function deleteUser(email) {
    const data = {
        email: email
    }
    const result = await pool.run(inserir=false, procurar=false, atualizar=false, deletar=true, gestaoacademica, users, data);
    return result;
}

module.exports = {
  createUser,
  findUserByEmail,
  updateUser,
  deleteUser
};