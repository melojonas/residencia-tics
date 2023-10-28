import React from 'react';
import { Link } from 'react-router-dom';

function TabelaGrande({ alunos }) {
    return (
        <table className='large-screen'>
            <thead>
                <tr>
                    <th>Nome do Aluno</th>
                    <th>Teste</th>
                    <th>Extra</th>
                    <th>Conceito</th>

                </tr>
            </thead>
            <tbody>
                {alunos.map((aluno) => (
                    <tr key={aluno._id}>
                        <td><Link to={`/anotacoes/${aluno._id}`}>{aluno.name}</Link></td>
                        <td><input type="text" className="nota-trabalho" value={aluno.teste} /></td>
                        <td><input type="text" className="ponto-extra" value={aluno.extra} /></td>
                        <td><input type="text" className="ponto-extra" value={aluno.media}/></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TabelaGrande;