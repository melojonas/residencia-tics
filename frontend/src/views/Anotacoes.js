import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import htmlParser from 'html-react-parser';
import Header from './partials/Header';
import Sidebar from './partials/Sidebar';
import EditorAnotacoes from './partials/EditorAnotacoes';
import '../css/App.css';

function Anotacoes() {
    const { usuarioId } = useParams();
    const [usuarioNome, setusuarioNome] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('');
    const usuarios = [
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
        // Converte usuarioId para número
        const usuarioIdNumber = parseInt(usuarioId, 10);

        // Carrega o nome e o tipo do usuario com base no usuarioId
        const usuarioEncontrado = usuarios.find((usuario) => usuario._id === usuarioIdNumber);

        if (usuarioEncontrado) {
            setusuarioNome(usuarioEncontrado.nome);
            setTipoUsuario(usuarioEncontrado.funcao);
        } else {
            setusuarioNome('Usuario não encontrado'); // Trata o caso em que o usuario não é encontrado
        }
    }, [usuarioId]);

    // Estados para as anotações
    const [anotacoes, setAnotacoes] = useState([]);
    const [anotacaoAtual, setAnotacaoAtual] = useState('');

    // Implementar a lógica para carregar as anotações do usuario com base no `usuarioId`
    useEffect(() => {
        // Exemplo: Carregar as anotações do usuario com usuarioId
        // setAnotacoes(anotacoesDoUsuario);
    }, [usuarioId]);

    const salvarAnotacao = (novaAnotacao) => {
        // Adiciona a data e hora à anotacao
        const dataAtual = new Date();
        const dataFormatada = dataAtual.toLocaleString();

        const anotacaoFormatada = `<h3>${dataFormatada}</h3><p>${novaAnotacao}</p>`;

        // Salvar nova anotacao no backend (ou localmente)
        // Atualizar a lista de anotacoes
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
                    <h1>Anotações do {tipoUsuario === 'Aluno' ? 'Aluno' : tipoUsuario === 'Professor' ? 'Professor' : 'Funcionário'}</h1>
                    <h2>{usuarioNome}</h2>
                    <div className="anotacoes-container">
                        <div className="editor-container">
                            <h2 style={{ color: 'white' }}>Fazer Anotação</h2>
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