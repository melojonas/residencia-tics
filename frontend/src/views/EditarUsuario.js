import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import InputMask from 'react-input-mask';
import '../css/App.css';
import '../css/EditarUsuario.css';
import Header from './partials/Header.js';
import Sidebar from './partials/Sidebar.js';

function EditarUsuario() {
    const { userId } = useParams();

    // Estados para os campos do formulário de edição
    const [nome, setNome] = useState('');
    const [matricula, setMatricula] = useState('');
    const [funcao, setFuncao] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');

    // Recuperar os dados do usuário a ser editado
    useEffect(() => {
        // Exemplo: Recuperar os dados do usuário com o ID userId e preencher os estados
        // Substitir isso com a chamada à API ou banco de dados
        fetchUserData(userId);
    }, [userId]);

    // Função para recuperar os dados do usuário (substitua com a lógica correta)
    const fetchUserData = (userId) => {
        // Simulação de busca de dados do usuário com base no userId
        const user = {
            nome: 'Nome do Usuário',
            matricula: 'Matrícula do Usuário',
            funcao: 'Função do Usuário',
            email: 'Email do Usuário',
            telefone: '(99) 99999-9999',
        };

        // Preencher os estados com os dados do usuário a ser editado
        setNome(user.nome);
        setMatricula(user.matricula);
        setFuncao(user.funcao);
        setEmail(user.email);
        setTelefone(user.telefone);
    };

    // Função para lidar com a submissão do formulário de edição
    const handleEditarUsuario = () => {
        // Implementar a lógica para editar o usuário, por exemplo, fazer uma chamada à API
        // com os dados atualizados (nome, matricula, funcao, email).
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
                    <h1>Editar Usuário</h1>
                    <form>
                        <div className='involve-input'>
                            <label>Nome:</label>
                            <input
                                className='addInput'
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </div>
                        <div className='involve-input'>
                            <label>Matrícula:</label>
                            <input
                                className='addInput'
                                type="text"
                                value={matricula}
                                onChange={(e) => setMatricula(e.target.value)}
                            />
                        </div>
                        <div className='involve-input'>
                            <label>Função:</label>
                            <input
                                className='addInput'
                                type="text"
                                value={funcao}
                                onChange={(e) => setFuncao(e.target.value)}
                            />
                        </div>
                        <div className='involve-input'>
                            <label>Email:</label>
                            <input
                                className='addInput'
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
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
                        <div>
                            <button id='editBtn' onClick={handleEditarUsuario}>Editar Usuário</button>
                        </div>
                    </form>
                    <button id='backButton'>
                        <Link to="/administracao">Voltar para a Lista de Usuários</Link>
                    </button>
                </main>
            </div>
        </div>
    );
}

export default EditarUsuario;
