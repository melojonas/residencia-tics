import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import '../css/App.css';
import '../css/AdicionarUsuario.css';
import Header from './partials/Header.js';
import Sidebar from './partials/Sidebar.js';
import axios from '../api/axios';

// @GuilhermeASousa, precisamos colocar useRef para acessar os inputs do formulário.
// Está dando erro no console do navegador, e não sei muito bem como resolver.
//      Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed 
//      an instance of InputElement which is inside StrictMode. Instead, add a ref 
//      directly to the element you want to reference. Learn more about using refs 
//      safely here: https://reactjs.org/link/strict-mode-find-node

function AdicionarUsuario() {
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [matricula, setMatricula] = useState('');
    const [funcao, setFuncao] = useState('Discente');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Create a new user object with the form data
        const newUser = {
            name: nome,
            role: funcao,
            email
        };

        // Send a POST request to the server with the new user data
        axios
        .post('/api/users', newUser,
        { 
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        .then((response) => {
            navigate('/administracao');
        })
        .catch((error) => {
            console.error(error);
            // Handle the error
        });
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
                    <h1>Adicionar Usuário</h1>
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
                                <option value="Discente">Discente</option>
                                <option value="Docente">Docente</option>
                                <option value="Coordenação">Coordenação</option>
                                <option value="Administração">Administração</option>
                            </select>
                        </div>
                        <div className='involve-input'>
                            <label style={{ width: '60px'}}>E-mail:</label>
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