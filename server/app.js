import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import fs from 'fs';
import session from 'express-session';
import bodyparser from 'body-parser';
import cookieparser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import flash from 'connect-flash';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';

import App from '../src/App';
import { connect } from './database';
import usersRoutes from './routes/users';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();

// Conectando ao banco de dados
connect();

// Iniciando a sessão
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      secure: false,
      resave: false,
      saveUninitialized: true,
      cookie: { cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } } // 30 dias
    })
);

app.use(flash());
app.use(cors());
app.use(helmet());
app.use(morgan('dev')); // TODO: Mudar para 'combined' em produção
app.use(bodyparser.json( { extended: true } ));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(express.static(path.resolve(__dirname, '..', 'build'), { index: false }));

// Rotas
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);

// Rota para renderizar o app
app.get('/*', (req, res) => {
    // Gerando o body do HTML
    const html = renderToString(
        <StaticRouter location={req.url}>
            <App />
        </StaticRouter>
    );
    
    // Lendo o index.html
    const indexFile = path.resolve(__dirname, '..', 'build', 'index.html');
    fs.readFile(indexFile, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Oops, better luck next time!');
        }

        // Inserindo o body do HTML no index.html
        return res.send(
            data.replace('<div id="root"></div>', `<div id="root">${html}</div>`)
        );
    });
});

export default app;