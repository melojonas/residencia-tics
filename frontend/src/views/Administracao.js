import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/App.css';
import '../css/Usuarios.css';
import Header from './partials/Header';
import Sidebar from './partials/Sidebar';
import axios from '../api/axios';

function Usuarios() {

    const [activeTable, setActiveTable] = useState('tabelaGeral');
    const [users, setUsers] = useState([]);

    // Simula a busca de dados do usuário
    const fetchUserData = async () => {
        try {
            const response = await axios.get('/api/users');
            const data = response.data;
            setUsers(data);
        } catch (error) {
            console.error('Erro ao buscar os dados do usuário:', error);
        }
    };

    // Chama a função de busca de dados quando o componente for montado
    useEffect(() => {
        fetchUserData();
    }, []);

    const handleButtonClick = (tableId) => {
        setActiveTable(tableId);
    };

    const handleAddUserClick = () => {
        // Implementar a lógica para adicionar um novo usuário
        console.log('Botão Adicionar Novo Usuário clicado');
    };

    const handleDeleteUserClick = (user_id) => {
        // Alerta de confirmação
        if (!window.confirm('Tem certeza que deseja excluir este usuário?')) { return; }

        // Use Axios to send a DELETE request to the server
        axios
            .delete(`/api/users/user/${user_id}`)
            .then((response) => {
                // Atualizar a lista de usuários
                fetchUserData();
            })
            .catch((error) => {
                console.error('Erro ao excluir o usuário:', error);
                // Tratar erros aqui
            });
    };

    const handleImportButtonClick = () => {
        const fileInput = document.getElementById('fileInput');
        fileInput.click();
    };

    const handleFileInputChange = async (event) => {
        const file = event.target.files[0];

        if (!file) {
            return; // Nenhum arquivo selecionado
        }

        try {
            // Realizar o processamento do arquivo e extrair os dados
            const newUserData = await processFile(file);

            // Atualizar o estado dos usuários, adicionando os novos dados à lista existente
            setUsers((prevUsers) => [...prevUsers, ...newUserData]);

            // Limpar o valor do campo de entrada de arquivo
            event.target.value = '';
        } catch (error) {
            console.error('Erro ao processar o arquivo:', error);
            // Tratar erros aqui
        }
    };


    const processFile = async (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                try {
                    // Processar o conteúdo do arquivo
                    const content = event.target.result;
                    const userData = parseCSV(content);
                    resolve(userData);
                } catch (error) {
                    reject(error);
                }
            };

            reader.readAsText(file);
        });
    };

    const parseCSV = (csvContent) => {
        //lógica de análise de CSV
        const lines = csvContent.split('\n');
        const userData = [];

        for (let i = 1; i < lines.length; i++) {
            const [nome, funcao, email] = lines[i].split(',');
            userData.push({ nome, funcao, email });
        }

        return userData;
    };

    // Filtrar usuários com base na função correspondente à tabela ativa
    const filteredUsers = users.filter((user) => {
        if (activeTable === 'tabelaGeral') {
            return true; // Mostrar todos os usuários
        } else if (activeTable === 'tabelaAlunos' && user.role === 'Discente') {
            return true; // Mostrar apenas alunos
        } else if (activeTable === 'tabelaProfessores' && user.role === 'Docente') {
            return true; // Mostrar apenas professores
        } else if (activeTable === 'tabelaFuncionarios' && (user.role === 'Coordenação' || user.role === 'Administração')) {
            return true; // Mostrar apenas funcionários
        }
        return false; // Ocultar outros casos
    });

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
                    <header>
                        <h1>Administração de Usuários</h1>
                        <nav className="categorias">
                            <button
                                id="btnGeral"
                                onClick={() => handleButtonClick('tabelaGeral')}
                                className={activeTable === 'tabelaGeral' ? 'active' : ''}
                            >
                                Geral
                            </button>
                            <button
                                id="btnAlunos"
                                onClick={() => handleButtonClick('tabelaAlunos')}
                                className={activeTable === 'tabelaAlunos' ? 'active' : ''}
                            >
                                Alunos
                            </button>
                            <button
                                id="btnProfessores"
                                onClick={() => handleButtonClick('tabelaProfessores')}
                                className={activeTable === 'tabelaProfessores' ? 'active' : ''}
                            >
                                Professores
                            </button>
                            <button
                                id="btnFuncionarios"
                                onClick={() => handleButtonClick('tabelaFuncionarios')}
                                className={activeTable === 'tabelaFuncionarios' ? 'active' : ''}
                            >
                                Funcionários
                            </button>
                        </nav>
                    </header>
                    <section id="user-list">
                        <h2>Lista de Usuários</h2>
                        <table className='large-screen' id={activeTable}>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Função</th>
                                    <th>Email</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user._id}>
                                        <td><Link to={`/anotacoes/${user._id}`}>{user.name}</Link></td>
                                        <td>{user.role}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <button className="btnEdit">
                                                <Link style={{ color: 'black' }} to={`/editar-usuario/${user._id}`}>Editar</Link>
                                            </button>
                                            <button className="btnDelete" onClick={() => handleDeleteUserClick(user._id)}>Excluir</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="responsive-table">
                            {filteredUsers.map((user) => (
                                <table key={user._id} className="aluno-item">
                                    <tbody>
                                        <tr>
                                            <th colspan="2" className="student-name"><Link to={`/anotacoes/${user._id}`}>{user.name}</Link></th>
                                        </tr>
                                        <tr>
                                            <th>Função</th>
                                            <td>{user.role}</td>
                                        </tr>
                                        <tr>
                                            <th>Email</th>
                                            <td>{user.email}</td>
                                        </tr>
                                        <tr>
                                            <th>Ações</th>
                                            <td>
                                                <button className="btnEdit">
                                                    <Link style={{ color: 'black' }} to={`/editar-usuario/${user._id}`}>Editar</Link>
                                                </button>
                                                <button className="btnDelete" onClick={() => handleDeleteUserClick(user._id)}>Excluir</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            ))}
                        </div>
                        <button id="btnAddUser">
                            <Link style={{ color: 'black' }} to="/adicionar-usuario">Adicionar Novo Usuário</Link>
                        </button>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: 'none' }}
                            accept=".xlsx, .xls, .csv"
                            onChange={(event) => handleFileInputChange(event)}
                        />
                        <button id="importButton" onClick={handleImportButtonClick}>
                            Importar Planilha
                        </button>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default Usuarios;