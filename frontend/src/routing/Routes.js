import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Cadastro from '../views/Cadastro';
import Diario from '../views/Diario';
import Login from '../views/Login';
import Presenca from '../views/Presenca';
import RequestToken from '../views/RequestToken';
import Usuarios from '../views/Usuarios';
import VerifyToken from '../views/VerifyToken';

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Usuarios" element={<Usuarios />} />
                <Route path="/Diario" element={<Diario />} />
                <Route path="/Cadastro" element={<Cadastro />} />
                <Route path="/Requesttoken" element={<RequestToken />} />
                <Route path="/Verifytoken" element={<VerifyToken />} />
                <Route path="/Presenca" element={<Presenca />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
