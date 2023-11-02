import React, { useEffect, useState } from 'react';
import '../css/App.css';
import '../css/Diario.css';
import Header from './partials/Header';
import Sidebar from './partials/Sidebar';
import TabelaGrande from './partials/TabelaGrande';
import TabelaPequena from './partials/TabelaPequena';

function Diario() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const [alunos, setAlunos] = useState([
        {
            id: 1,
            nome: 'Guilherme de Albuquerque Sousa',
            prova: '8.5',
            trabalho: '9.0',
            extra: '1.0',
            recuperacao: '7.5',
            media: '8.0',
            frequencia: '95%',
        },
        {
            id: 2,
            nome: 'Rodrigo Souza Lopes de Andrade',
            prova: '8.5',
            trabalho: '9.0',
            extra: '1.0',
            recuperacao: '7.5',
            media: '8.0',
            frequencia: '95%',
        },
        {
            id: 3,
            nome: 'Murilo de Medeiros Viana',
            prova: '8.5',
            trabalho: '9.0',
            extra: '1.0',
            recuperacao: '7.5',
            media: '8.0',
            frequencia: '95%',
        },
        {
            id: 4,
            nome: 'João Henrique Valente Pereira',
            prova: '8.5',
            trabalho: '9.0',
            extra: '1.0',
            recuperacao: '7.5',
            media: '8.0',
            frequencia: '95%',
        },
        {
            id: 5,
            nome: 'Jonas da Silva Melo',
            prova: '8.5',
            trabalho: '9.0',
            extra: '1.0',
            recuperacao: '7.5',
            media: '8.0',
            frequencia: '95%',
        },
    ]);

    // Função para buscar a lista de alunos
    const fetchAlunos = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8080/api/users/discentes'); // Substitir pela rota da API
            if (!response.ok) {
                throw new Error('Erro ao buscar dados dos alunos');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao buscar dados dos alunos:', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchAlunos()
            .then((alunosData) => {
                setAlunos(alunosData);
            })
            .catch((error) => {
                // Lidar com erros aqui
            });
    }, []);

    return (
        <div className="container">
            <Header toggleSidebar={toggleSidebar} />
            <div className="main">
                <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <main className="content">
                    <h1>Diário de Classe Eletrônico</h1>
                    <div>
                        <form action="" method="post">
                            <div className="select-turmas">
                                <div className="bimestres">
                                    <label for="bimestre-select">Bimestre:</label>
                                    <select id="bimestre-select">
                                        <option value="" disabled selected>Selecione</option>
                                        <option value="bimestre1">1º Bimestre</option>
                                        <option value="bimestre2">2° Bimestre</option>
                                        <option value="bimestre2">3° Bimestre</option>
                                        <option value="bimestre2">4° Bimestre</option>
                                    </select>
                                </div>
                            </div>
                            <TabelaGrande alunos={alunos} />
                            <TabelaPequena alunos={alunos} />
                            <button id='btnEdit' type="submit">Salvar Alterações</button>
                            <button id='btnDelete' type="delete">Descartar Alterações</button>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Diario;