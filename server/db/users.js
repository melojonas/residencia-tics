/* CRUD operations on the users table in the database */

const { run } = require('../database');

async function createUser(email, password) {
    const banco = "gestaoacademica";
    const documento = "users";
    const data = {
        email: email,
        password: password,
    };
    await run(inserir=true, procurar=false, atualizar=false, deletar=false, banco, documento, data);
}

async function findUserByEmail(email) {
    const data = {
        email: email,
    }
    const result = await run(inserir=false, procurar=true, atualizar=false, deletar=false, gestaoacademica, users, data)
    return result.rows[0];
}

async function updateUser(email, password) {
    const data = {
        email: email,
        password: password,
    };
    const result = await run(inserir=false, procurar=false, atualizar=true, deletar=false, gestaoacademica, users, data);
    return result;
}

async function deleteUser(email) {
    const data = {
        email: email,
    }
    const result = await run(inserir=false, procurar=false, atualizar=false, deletar=true, gestaoacademica, users, data);
    return result;
}

module.exports = {
  createUser,
  findUserByEmail,
  updateUser,
  deleteUser
};