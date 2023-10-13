import React, { useState, useEffect } from 'react';
import Header from './partials/Header';
import Sidebar from './partials/Sidebar';
import '../css/Usuarios.css';
import '../css/App.css';

function Usuarios() {

    const exampleUsers = [
        {
            id: 1,
            nome: 'Guilherme de Albuquerque Sousa',
            funcao: 'Aluno',
            email: 'guilherme@gmail.com',
        },
        {
            id: 2,
            nome: 'Rodrigo Souza Lopes de Andrade',
            funcao: 'Aluno',
            email: 'rodrigo@gmail.com',
        },
        {
            id: 3,
            nome: 'Murilo de Medeiros Viana',
            funcao: 'Professor',
            email: 'murilo@gmail.com',
        },
        {
            id: 4,
            nome: 'João Henrique Valente Pereira',
            funcao: 'Funcionário',
            email: 'joao@gmail.com',
        },
        {
            id: 5,
            nome: 'Jonas da Silva Melo',
            funcao: 'Funcionário',
            email: 'jonas@gmail.com',
        },
    ];

    const [activeTable, setActiveTable] = useState('tabelaGeral');
    const [users, setUsers] = useState(exampleUsers);
    //const [users, setUsers] = useState([]);

    // Simula a busca de dados do usuário
    const fetchUserData = async () => {
        try {
            const response = await fetch('/api/users'); // Substituir pela rota da API
            const data = await response.json();
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
        } else if (activeTable === 'tabelaAlunos' && user.funcao === 'Aluno') {
            return true; // Mostrar apenas alunos
        } else if (activeTable === 'tabelaProfessores' && user.funcao === 'Professor') {
            return true; // Mostrar apenas professores
        } else if (activeTable === 'tabelaFuncionarios' && user.funcao === 'Funcionário') {
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
                        <table id={activeTable}>
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
                                    <tr key={user.id}>
                                        <td>{user.nome}</td>
                                        <td>{user.funcao}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <button className="btnEdit">Editar</button>
                                            <button className="btnDelete">Excluir</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button id="btnAddUser" onClick={handleAddUserClick}>
                            Adicionar Novo Usuário
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