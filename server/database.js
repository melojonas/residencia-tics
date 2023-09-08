/* Configurações do banco de dados PostgreSQL */

const pg = require('pg')
const fs = require('fs')
const path = require('path')

const config = {
    user: process.env.LOCAL_USER,
    database: process.env.LOCAL_DATABASE,
    password: process.env.LOCAL_PASSWORD,
    port: process.env.LOCAL_PORT,
    host: process.env.LOCAL_HOST,
    ssl: {
        require: true,
        rejectUnauthorized: false,
        key: fs.readFileSync(path.join(__dirname, '/certs/key.pem')).toString(),
        cert: fs.readFileSync(path.join(__dirname, '/certs/certificate.pem')).toString()
    }
}

const pool = new pg.Pool(config)

const query = async (text, params) => {
    const res = await pool.query(text, params)
    return res   
}

module.exports = {
    query
}