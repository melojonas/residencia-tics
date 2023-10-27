const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const url = process.env.MONGODBURL;

mongoose.Promise = global.Promise;

const connect = async () => {
  
  mongoose.connect('mongodb+srv://gestaoacademica-residenciaTICS:YLf!PLfGbt5RKFhhjk@cluster0.6wdhv8s.mongodb.net/gestaoacademica?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

  const db = mongoose.connection;
  db.on("error", () => {
    console.error("Erro ao se conectar ao banco de dados");
  });
  db.once("open", () => {
    console.log("Conectado ao banco de dados");
  });
};

module.exports = {connect};
