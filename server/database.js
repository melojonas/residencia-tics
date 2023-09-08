/* Configurações do banco de dados PostgreSQL */

const pg = require('pg')
 
const pool = new pg.Pool()

const query = async (text, params) => {
    const res = await pool.query(text, params)
    return res   
}

const client = async () => {
    const client = await pool.connect()
    return client
}

module.exports = {
    query,
    client
}