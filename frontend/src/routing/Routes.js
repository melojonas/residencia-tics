import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import RequireAuth from '../views/partials/RequireAuth';

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
import Calendario from '../views/Calendario';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/requesttoken" element={<RequestToken />} />
                <Route path="/verifytoken" element={<VerifyToken />} />

                <Route element={<RequireAuth />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/administracao" element={<Administracao />} />
                    <Route path="/avaliacoes" element={<Avaliacoes />} />
                    <Route path="/presenca" element={<Presenca />} />
                    <Route path="/anotacoes/:usuarioId" element={<Anotacoes />} />
                    <Route path="/adicionar-usuario" element={<AdicionarUsuario />} />
                    <Route path="/editar-usuario/:userId" element={<EditarUsuario />} />
                    <Route path="/calendario" element={<Calendario />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;