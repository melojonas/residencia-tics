import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/App.css';
import Header from './partials/Header.js';
import Sidebar from './partials/Sidebar.js';

function AdicionarUsuario() {

    const [nome, setNome] = useState('');
    const [matricula, setMatricula] = useState('');
    const [funcao, setFuncao] = useState('discente');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implementar a lógica para enviar os dados do novo usuário para o servidor.
        // Redirecionar o usuário de volta para a página de administração após adicionar o usuário.
    };

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="container">
            <Header toggleSidebar={toggleSidebar} />
            <div className="main">
                <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <main className="content">
                    <h2>Adicionar Novo Usuário</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Nome:</label>
                            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
                        </div>
                        <div>
                            <label>Matrícula:</label>
                            <input type="text" value={matricula} onChange={(e) => setMatricula(e.target.value)} required />
                        </div>
                        <div>
                            <label>Função:</label>
                            <select value={funcao} onChange={(e) => setFuncao(e.target.value)} required>
                                <option value="discente">Discente</option>
                                <option value="docente">Docente</option>
                                <option value="funcionario">Funcionário</option>
                            </select>
                        </div>
                        <div>
                            <label>Email:</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div>
                            <label>Telefone para Contato:</label>
                            <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                        </div>
                        <button type="submit">Adicionar Usuário</button>
                    </form>
                    <Link to="/administracao">Voltar para a Lista de Usuários</Link>
                </main>
            </div>
        </div>
    );
}

export default AdicionarUsuario;