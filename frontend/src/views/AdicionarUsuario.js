import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';
import '../css/App.css';
import '../css/AdicionarUsuario.css';
import Header from './partials/Header.js';
import Sidebar from './partials/Sidebar.js';

function AdicionarUsuario() {

    const [nome, setNome] = useState('');
    const [matricula, setMatricula] = useState('');
    const [funcao, setFuncao] = useState('');
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
                    <h1>Adicionar Novo Usuário</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='involve-input'>
                            <label>Nome:</label>
                            <input className='addInput' type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
                        </div>
                        <div className='involve-input'>
                            <label>Matrícula:</label>
                            <input className='addInput' type="text" value={matricula} onChange={(e) => setMatricula(e.target.value)} required />
                        </div>
                        <div className='involve-input'>
                            <label>Função:</label>
                            <select value={funcao} onChange={(e) => setFuncao(e.target.value)} required>
                                <option value="" disabled selected>Selecione:</option>
                                <option value="discente">Discente</option>
                                <option value="docente">Docente</option>
                                <option value="funcionario">Funcionário</option>
                            </select>
                        </div>
                        <div className='involve-input'>
                            <label>Email:</label>
                            <input className='addInput' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className='involve-input'>
                            <label>Telefone:</label>
                            <InputMask
                                className='addInput'
                                mask="(99) 99999-9999"
                                maskChar="_"
                                value={telefone}
                                onChange={(e) => setTelefone(e.target.value)}
                                type="text"
                            />
                        </div>
                        <button id='addUser' type="submit">Adicionar Usuário</button>
                    </form>
                    <button id='backButton'>
                        <Link to="/administracao">Voltar para a Lista de Usuários</Link>
                    </button>
                </main>
            </div>
        </div>
    );
}

export default AdicionarUsuario;