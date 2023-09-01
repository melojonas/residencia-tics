/* Ponto de entrada do aplicativo */

const express = require('express');

// Inicializando o servidor
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Certificado TLS (HTTPS) Handler
