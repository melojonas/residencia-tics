/* IMPORTAÇÃO DAS BIBLIOTECAS EXPRESS, BCRYPT, PATH, CORS, EXPRESS-SESSION, PYTHON-SHELL */
const express = require("express");
const app = express();
const { PythonShell } = require("python-shell");
const pyshell = new PythonShell("script.py");
const bcrypt = require("bcryptjs");
const flash = require("flash");
const validator = require("validator");
const path = require("path");
const cors = require("cors");
const session = require("express-session");

/* CONFIGURAÇÕES INICIAIS DA SESSION, EXPRESS, CORS. SET DA VIEW ENGINE EJS */

app.set("view engine", "ejs");

app.use(
  session({
    secret: "CHRJFfs%#kpRu4VgeR8xN8pyKEpDaHrf#!9&8QTQA",
    secure: false,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000000 },
  })
);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

/* TESTE PYTHON */

PythonShell.run("Python.py").then((messages) => {
  console.log(messages);
});

/* ROTA PRINCIPAL (HOME PAGE, FUTURO INDEX.HTML (EJS)*/

app.get("/", (req, res) => {
  res.send("Temporário Principal");
});

/* ABERTURA DO SERVIDOR NA PORTA 8080 */

app.listen(8080, (req, res) => {
  console.log("Server Running");
});
