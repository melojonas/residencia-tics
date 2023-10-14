import React from 'react';
import { Link } from 'react-router-dom';

function TabelaPequena({ alunos }) {
    return (
        <div className="responsive-table">
            {alunos.map((aluno) => (
                <table key={aluno.id} className="aluno-item">
                    <tbody>
                        <tr>
                            <th colspan="2" className="student-name"><Link to={`/anotacoes/${aluno.id}`}>{aluno.name}</Link></th>
                        </tr>
                        <tr>
                            <th>Prova</th>
                            <td><input type="text" className="nota-prova" value={aluno.prova} /></td>
                        </tr>
                        <tr>
                            <th>Trabalho</th>
                            <td><input type="text" className="nota-trabalho" value={aluno.trabalho} /></td>
                        </tr>
                        <tr>
                            <th>Extra</th>
                            <td><input type="text" className="ponto-extra" value={aluno.extra} /></td>
                        </tr>
                        <tr>
                            <th>Recuperação</th>
                            <td><input type="text" className="nota-recuperacao" value={aluno.recuperacao} /></td>
                        </tr>
                        <tr>
                            <th>Média</th>
                            <td><span className="media-bimestre">{aluno.media}</span></td>
                        </tr>
                        <tr>
                            <th>Freq.(%)</th>
                            <td><input type="text" className="frequencia" value={aluno.frequencia} /></td>
                        </tr>
                    </tbody>
                </table>
            ))}
        </div>
    );
}

export default TabelaPequena;
