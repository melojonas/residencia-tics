#!/usr/bin/env node
const http = require('http');
const app = require('./app');

// Inicializando o servidor
var PORT = process.env.PORT || '8080';

// Certificado TLS 1.3
/* const TLS_KEY_PATH = 'path_to_your_private_key.pem'; // TODO: Replace with the path to your private key file
const TLS_CERT_PATH = 'path_to_your_certificate.pem'; // TODO: Replace with the path to your certificate file

const serverOptions = {
  key: fs.readFileSync(TLS_KEY_PATH),
  cert: fs.readFileSync(TLS_CERT_PATH),
  secureOptions: require('constants').SSL_OP_NO_TLSv1 | require('constants').SSL_OP_NO_TLSv1_1,
}; */

app.set('port', PORT);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});