const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const path = require("path");
const cors = require("cors");
const session = require("express-session");

app.use(
  session({
    secret: "CHRJFfs%#kpRu4VgeR8xN8pyKEpDaHrf#!9&8QTQA",
    secure: true,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000000 },
  })
);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Temporário Principal");
});

app.listen(8080, (req, res) => {
  console.log("Server Running");
});