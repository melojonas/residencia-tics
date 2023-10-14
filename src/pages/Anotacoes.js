import htmlParser from 'html-react-parser';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/App.css';
import Tiptap from '../components/Tiptap';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export const Anotacoes = () => {
    const { alunoId } = useParams();
    const [alunoNome, setAlunoNome] = useState('');

    useEffect(() => {
        // Buscar o nome do aluno com base no `alunoId`
        fetch(`/api/users/usuario/${alunoId}`)
            .then((response) => response.json())
            .then((aluno) => {
                setAlunoNome(aluno.name);
            })
            .catch((error) => {
                console.error('Erro ao buscar dados do aluno:', error);
            });
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
                            <Tiptap />
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
