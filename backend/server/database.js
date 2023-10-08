const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const url = process.env.MONGODB_URI;

mongoose.Promise = global.Promise;

const connect = async () => {
  
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

  const db = mongoose.connection;
  db.on("error", () => {
    console.error("Erro ao se conectar ao banco de dados");
  });
  db.once("open", () => {
    console.log("Conectado ao banco de dados");
  });
};

module.exports = { connect };
