import React, { useEffect, useState } from 'react';
import '../css/App.css';
import '../css/Diario.css';
import Header from './partials/Header';
import Sidebar from './partials/Sidebar';
import TabelaGrande from './partials/TabelaGrande';
import TabelaPequena from './partials/TabelaPequena';
import axios from '../api/axios';

function Diario() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const [alunos, setAlunos] = useState([]);

    // Função para buscar a lista de alunos
    const fetchAlunos = async () => {
        axios
            .get('/users/discentes')
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetchAlunos().then((alunos) => {
            setAlunos(alunos);
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