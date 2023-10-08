import React, { useState } from 'react';
import Header from './partials/Header';
import Sidebar from './partials/Sidebar';
import '../css/Presenca.css';
import '../css/App.css';

function Presenca() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="container">
            <Header toggleSidebar={toggleSidebar} />
            <div className="main">
                <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <main class="content">
                    <h1>Lista de Presença</h1>
                    <div class="select-turmas">
                        <label for="turma-select">Turma:</label>
                        <select id="turma-select">
                            <option value="turma1">Turma 1</option>
                            <option value="turma2">Turma 2</option>
                        </select>
                        <label for="data">Data:</label>
                        <input type="date" id="data" name="data" />
                    </div>
                    <table class="student-table">
                        <thead>
                            <tr>
                                <th>Aluno</th>
                                <th>Presença</th>
                                <th>Observações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Guilherme de Albuquerque Sousa</td>
                                <td><input type="checkbox" checked/></td>
                                <td><textarea class="observacoes">Observações sobre o aluno...</textarea></td>
                            </tr>
                            <tr>
                                <td>João Henrique Valente Pereira</td>
                                <td><input type="checkbox"/></td>
                                <td><textarea class="observacoes">Observações sobre o aluno...</textarea></td>
                            </tr>
                            <tr>
                                <td>Jonas da Silva Melo</td>
                                <td><input type="checkbox"/></td>
                                <td><textarea class="observacoes">Observações sobre o aluno...</textarea></td>
                            </tr>
                            <tr>
                                <td>Murilo de Medeiros Viana</td>
                                <td><input type="checkbox"/></td>
                                <td><textarea class="observacoes">Observações sobre o aluno...</textarea></td>
                            </tr>
                            <tr>
                                <td>Rodrigo Souza Lopes de Andrade</td>
                                <td><input type="checkbox"/></td>
                                <td><textarea class="observacoes">Observações sobre o aluno...</textarea></td>
                            </tr>
                        </tbody>
                    </table>
                    <button id='saveBtn' type="submit">Salvar Alterações</button>
                    <button id='deletBtn' type="delete">Descartar Alterações</button>
                </main>
            </div>
        </div>
    );
}

export default Presenca;