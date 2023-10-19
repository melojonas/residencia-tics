import React from 'react';
import { Link } from 'react-router-dom';

function TabelaGrande({ alunos }) {
    return (
        <table className='large-screen'>
            <thead>
                <tr>
                    <th>Nome do Aluno</th>
                    <th>Prova</th>
                    <th>Trabalho</th>
                    <th>Extra</th>
                    <th>Recuperação</th>
                    <th>Média</th>
                    <th>Freq.(%)</th>
                </tr>
            </thead>
            <tbody>
                {alunos.map((aluno) => (
                    <tr key={aluno.id}>
                        <td><Link to={`/anotacoes/${aluno.id}`}>{aluno.nome}</Link></td>
                        <td><input type="text" className="nota-prova" value={aluno.prova} /></td>
                        <td><input type="text" className="nota-trabalho" value={aluno.trabalho} /></td>
                        <td><input type="text" className="ponto-extra" value={aluno.extra} /></td>
                        <td><input type="text" className="nota-recuperacao" value={aluno.recuperacao} /></td>
                        <td><span className="media-bimestre">{aluno.media}</span></td>
                        <td><input type="text" className="frequencia" value={aluno.frequencia} /></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TabelaGrande;