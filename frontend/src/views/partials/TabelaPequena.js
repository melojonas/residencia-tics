import React from 'react';
import { Link } from 'react-router-dom';

function TabelaPequena({ alunos }) {
    return (
        <div className="responsive-table">
            {alunos.map((aluno) => (
                <table key={aluno.id} className="aluno-item">
                    <tbody>
                        <tr>
                            <th colspan="2" className="student-name"><Link to={`/anotacoes/${aluno.id}`}>{aluno.nome}</Link></th>
                        </tr>
                        <tr>
                            <th>Teste</th>
                            <td><input type="text" className="nota-trabalho" value={aluno.trabalho} /></td>
                        </tr>
                        <tr>
                            <th>Extra</th>
                            <td><input type="text" className="ponto-extra" value={aluno.extra} /></td>
                        </tr>
                        <tr>
                            <th>Conceito</th>
                            <td><span className="media-bimestre">{aluno.media}</span></td>
                        </tr>
                    </tbody>
                </table>
            ))}
        </div>
    );
}

export default TabelaPequena;