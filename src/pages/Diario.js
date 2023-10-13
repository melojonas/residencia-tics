import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../css/Diario.css';
import '../css/App.css';
import TabelaGrande from '../components/TabelaGrande';
import TabelaPequena from '../components/TabelaPequena';

export const Diario = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const [alunos, setAlunos] = useState([]);

    // Função para buscar a lista de alunos
    const fetchAlunos = async () => {
        try {
            const response = await fetch('/api/users'); // Substitir pela rota da API
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
                                <div className="turmas">
                                    <label for="turma-select">Turma:</label>
                                    <select id="turma-select">
                                        <option value="" disabled selected>Selecione</option>
                                        <option value="turma1">Turma 1</option>
                                        <option value="turma2">Turma 2</option>
                                    </select>
                                </div>
                                <div className="bimestres">
                                    <label for="bimestre-select">Bimestre:</label>
                                    <select id="bimestre-select">
                                        <option value="" disabled selected>Selecione</option>
                                        <option value="bimestre1">1º Bimestre</option>
                                        <option value="bimestre2">2° Bimestre</option>
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
