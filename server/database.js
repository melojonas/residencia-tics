const mongoose = require ('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.MONGODBURL;

mongoose.Promise = global.Promise;
mongoose.connect(uri).then(() => {
  console.log("Conectado com MondoDB no Mongoose");
}).catch((err) => {
  console.log(err);
});

module.exports = mongoose;












