import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Administracao from '../views/Administracao';
import Anotacoes from '../views/Anotacoes';
import Avaliacoes from '../views/Avaliacoes';
import Cadastro from '../views/Cadastro';
import Home from '../views/Home';
import Login from '../views/Login';
import Presenca from '../views/Presenca';
import RequestToken from '../views/RequestToken';
import VerifyToken from '../views/VerifyToken';
import AdicionarUsuario from '../views/AdicionarUsuario';
import EditarUsuario from '../views/EditarUsuario';

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/administracao" element={<Administracao />} />
                <Route path="/avaliacoes" element={<Avaliacoes />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/login" element={<Login />} />
                <Route path="/requesttoken" element={<RequestToken />} />
                <Route path="/verifytoken" element={<VerifyToken />} />
                <Route path="/presenca" element={<Presenca />} />
                <Route path="/anotacoes/:usuarioId" element={<Anotacoes />} />
                <Route path="/adicionar-usuario" element={<AdicionarUsuario />} />
                <Route path="/editar-usuario/:userId" element={<EditarUsuario />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;