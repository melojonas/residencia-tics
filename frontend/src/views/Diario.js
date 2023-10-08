import React, { useState } from 'react';
import Header from './partials/Header';
import Sidebar from './partials/Sidebar';
import '../css/Diario.css';
import '../css/App.css';

function Diario() {
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
                    <h1>Diário de Classe Eletrônico</h1>
                    <div className="large-screen">
                        <form action="" method="post">
                            <div className="select-turmas">
                                <label for="turma-select">Turma:</label>
                                <select id="turma-select">
                                    <option value="" disabled selected>Selecione</option>
                                    <option value="turma1">Turma 1</option>
                                    <option value="turma2">Turma 2</option>
                                </select>
                                <label for="bimestre-select">Bimestre:</label>
                                <select id="bimestre-select">
                                    <option value="" disabled selected>Selecione</option>
                                    <option value="bimestre1">1º Bimestre</option>
                                    <option value="bimestre2">2° Bimestre</option>
                                </select>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nome do Aluno</th>
                                        <th>Prova</th>
                                        <th>Trabalho</th>
                                        <th>Extra</th>
                                        <th>Recuperação</th>
                                        <th>Média</th>
                                        <th>Freq.(%)</th>
                                        <th>Observações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Guilherme de Albuquerque Sousa</td>
                                        <td><input type="text" className="nota-prova" value="8.5"/></td>
                                        <td><input type="text" className="nota-trabalho" value="9.0"/></td>
                                        <td><input type="text" className="ponto-extra" value="1.0"/></td>
                                        <td><input type="text" className="nota-recuperacao" value="7.5"/></td>
                                        <td><span className="media-bimestre">8.0</span></td>
                                        <td><input type="text" className="frequencia" value="95%"/></td>
                                        <td><textarea className="observacoes">Observações sobre o aluno...</textarea></td>
                                    </tr>
                                    <tr>
                                        <td>João Henrique Valente Pereira</td>
                                        <td><input type="text" className="nota-prova" value="8.5"/></td>
                                        <td><input type="text" className="nota-trabalho" value="9.0"/></td>
                                        <td><input type="text" className="ponto-extra" value="1.0"/></td>
                                        <td><input type="text" className="nota-recuperacao" value="7.5"/></td>
                                        <td><span className="media-bimestre">8.0</span></td>
                                        <td><input type="text" className="frequencia" value="95%"/></td>
                                        <td><textarea className="observacoes">Observações sobre o aluno...</textarea></td>
                                    </tr>
                                    <tr>
                                        <td>Jonas da Silva Melo</td>
                                        <td><input type="text" className="nota-prova" value="8.5"/></td>
                                        <td><input type="text" className="nota-trabalho" value="9.0"/></td>
                                        <td><input type="text" className="ponto-extra" value="1.0"/></td>
                                        <td><input type="text" className="nota-recuperacao" value="7.5"/></td>
                                        <td><span className="media-bimestre">8.0</span></td>
                                        <td><input type="text" className="frequencia" value="95%"/></td>
                                        <td><textarea className="observacoes">Observações sobre o aluno...</textarea></td>
                                    </tr>
                                    <tr>
                                        <td>Murilo de Medeiros Viana</td>
                                        <td><input type="text" className="nota-prova" value="8.5"/></td>
                                        <td><input type="text" className="nota-trabalho" value="9.0"/></td>
                                        <td><input type="text" className="ponto-extra" value="1.0"/></td>
                                        <td><input type="text" className="nota-recuperacao" value="7.5"/></td>
                                        <td><span className="media-bimestre">8.0</span></td>
                                        <td><input type="text" className="frequencia" value="95%"/></td>
                                        <td><textarea className="observacoes">Observações sobre o aluno...</textarea></td>
                                    </tr>
                                    <tr>
                                        <td>Rodrigo Souza Lopes de Andrade</td>
                                        <td><input type="text" className="nota-prova" value="8.5"/></td>
                                        <td><input type="text" className="nota-trabalho" value="9.0"/></td>
                                        <td><input type="text" className="ponto-extra" value="1.0"/></td>
                                        <td><input type="text" className="nota-recuperacao" value="7.5"/></td>
                                        <td><span className="media-bimestre">8.0</span></td>
                                        <td><input type="text" className="frequencia" value="95%"/></td>
                                        <td><textarea className="observacoes">Observações sobre o aluno...</textarea></td>
                                    </tr>
                                </tbody>
                            </table>
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
