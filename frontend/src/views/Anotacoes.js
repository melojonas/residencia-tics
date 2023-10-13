import htmlParser from 'html-react-parser';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/App.css';
import EditorAnotacoes from './partials/EditorAnotacoes';
import Header from './partials/Header';
import Sidebar from './partials/Sidebar';

function Anotacoes() {
    const { alunoId } = useParams();
    const [alunoNome, setAlunoNome] = useState('');
    const alunos = [
        {
            id: 1,
            nome: 'Guilherme de Albuquerque Sousa',
            funcao: 'Aluno',
            email: 'guilherme@gmail.com',
        },
        {
            id: 2,
            nome: 'Rodrigo Souza Lopes de Andrade',
            funcao: 'Aluno',
            email: 'rodrigo@gmail.com',
        },
        {
            id: 3,
            nome: 'Murilo de Medeiros Viana',
            funcao: 'Professor',
            email: 'murilo@gmail.com',
        },
        {
            id: 4,
            nome: 'João Henrique Valente Pereira',
            funcao: 'Funcionário',
            email: 'joao@gmail.com',
        },
        {
            id: 5,
            nome: 'Jonas da Silva Melo',
            funcao: 'Funcionário',
            email: 'jonas@gmail.com',
        },
    ];

    useEffect(() => {
        // Converte alunoId para número
        const alunoIdNumber = parseInt(alunoId, 10);

        // Carrega o nome do aluno com base no alunoId
        const alunoEncontrado = alunos.find((aluno) => aluno.id === alunoIdNumber);

        if (alunoEncontrado) {
            setAlunoNome(alunoEncontrado.nome);
        } else {
            setAlunoNome('Aluno não encontrado'); // Trata o caso em que o aluno não é encontrado
        }
    }, [alunoId]);

    // Estados para as anotações
    const [anotacoes, setAnotacoes] = useState([]);
    const [anotacaoAtual, setAnotacaoAtual] = useState('');

    // Implementar a lógica para carregar as anotações do aluno com base no `alunoId`
    useEffect(() => {
        // Exemplo: Carregar as anotações do aluno com alunoId
        // setAnotacoes(anotacoesDoAluno);
    }, [alunoId]);

    const salvarAnotacao = (novaAnotacao) => {
        // Adiciona a data e hora à anotação
        const dataAtual = new Date();
        const dataFormatada = dataAtual.toLocaleString();

        const anotacaoFormatada = `<h3>${dataFormatada}</h3><p>${novaAnotacao}</p>`;

        // Salvar nova anotação no backend (ou localmente)
        // Atualizar a lista de anotações
        setAnotacoes([...anotacoes, anotacaoFormatada]);
    };

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
                    <h1>Anotações do Aluno</h1>
                    <h2>Aluno: {alunoNome}</h2>
                    <div className="anotacoes-container">
                        <div className="editor-container">
                            <h2 style={{color: 'white'}}>Fazer Anotação</h2>
                            <EditorAnotacoes initialContent={anotacaoAtual} onSave={salvarAnotacao} />
                        </div>
                        <div className="anotacoes-list-container">
                            <h2>Anotações</h2>
                            {anotacoes.map((anotacao, index) => (
                                <div className='anotacao' key={index}>{htmlParser(anotacao)}</div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Anotacoes;