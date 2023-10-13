import http from 'http';
import app from './app';

// Inicializando o servidor
var PORT = process.env.PORT || '8080';

app.set('port', PORT);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Servidor está rodando na porta http://localhost:${PORT}`);
});