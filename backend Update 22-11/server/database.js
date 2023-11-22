const dotenv = require('dotenv').config()
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const connect = async () => {
  
  mongoose.connect('mongodb+srv://gestaoacademica-residenciaTICS:YLfPLfGbt5RKFhh@cluster0.6wdhv8s.mongodb.net/gestaoacademica?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }); 
  const db = mongoose.connection;
  db.once("open", () => {
  console.log("Conectado ao banco de dados");
  });
  db.on("error", () => {
    console.error("Erro ao se conectar ao banco de dados");
  });

};

module.exports = {connect}
