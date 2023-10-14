import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Cadastro } from './pages/Cadastro';
import { Diario } from './pages/Diario';
import { Frequencia } from './pages/Frequencia';
import { Usuarios } from './pages/Usuarios';
import { Anotacoes } from './pages/Anotacoes';
import { RequestToken } from './pages/RequestToken';
import { VerifyToken } from './pages/VerifyToken';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Home />} />
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
