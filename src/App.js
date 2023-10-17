import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Anotacoes } from './pages/Anotacoes';
import { Cadastro } from './pages/Cadastro';
import { Diario } from './pages/Diario';
import { Frequencia } from './pages/Frequencia';
import { Home } from './pages/Home';
import { RequestToken } from './pages/RequestToken';
import { Usuarios } from './pages/Usuarios';
import { VerifyToken } from './pages/VerifyToken';
const { Login } = require ('./pages/Login')

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/diario" element={<Diario />} />
        <Route path="/frequencia" element={<Frequencia />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/anotacoes/:alunoId" element={<Anotacoes />} />
        <Route path="/Requesttoken" element={<RequestToken />} />
        <Route path="/Verifytoken" element={<VerifyToken />} />
      </Routes>
    </>
  );
}

export default App;
