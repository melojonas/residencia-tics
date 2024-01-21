import React from 'react';
import { Link } from 'react-router-dom';

function TabelaPequena({ alunos }) {
    return (
        <div className="responsive-table">
            {alunos.map((aluno) => (
                <table key={aluno._id} className="aluno-item">
                    <tbody>
                        <tr>
                            <th colspan="2" className="student-name"><Link to={`/anotacoes/${aluno._id}`}>{aluno.name}</Link></th>
                        </tr>
                        <tr>
                            <th>Teste</th>
                            <td><input type="text" className="nota-trabalho" value={"10.0"} /></td>
                        </tr>
                        <tr>
                            <th>Extra</th>
                            <td><input type="text" className="ponto-extra" value={"5.0"} /></td>
                        </tr>
                        <tr>
                            <th>Conceito</th>
                            <td><span className="media-bimestre">{"7.5"}</span></td>
                        </tr>
                    </tbody>
                </table>
            ))}
        </div>
    );
}

export default TabelaPequena;