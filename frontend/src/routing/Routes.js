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

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Administracao" element={<Administracao />} />
                <Route path="/Avaliacoes" element={<Avaliacoes />} />
                <Route path="/Cadastro" element={<Cadastro />} />
                <Route path="/Requesttoken" element={<RequestToken />} />
                <Route path="/Verifytoken" element={<VerifyToken />} />
                <Route path="/Presenca" element={<Presenca />} />
                <Route path="/anotacoes/:usuarioId" element={<Anotacoes />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;