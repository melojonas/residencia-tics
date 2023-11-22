import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';
import '../css/CriarQuestao.css';
import '../css/App.css';
import Header from './partials/Header.js';
import Sidebar from './partials/Sidebar.js';

function CriarQuestao() {
    const [disciplina, setDisciplina] = useState('');
    const [tema, setTema] = useState('');
    const [conteudo, setConteudo] = useState('');

    const handleDisciplinaChange = (event) => {
        setDisciplina(event.target.value);
    };

    const handleTemaChange = (event) => {
        setTema(event.target.value);
    };

    const handleConteudoChange = (value) => {
        setConteudo(value);
    };

    const handleSalvarQuestao = () => {
        // Implementar a lógica para salvar a questão com os dados inseridos
        console.log('Disciplina:', disciplina);
        console.log('Tema:', tema);
        console.log('Conteúdo:', conteudo);
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
                    <header>
                        <h1>Criar Nova Questão</h1>
                        <Link to="/lista-questoes">Voltar para Lista de Questões</Link>
                    </header>
                    <main>
                        <form >
                            <div className='label-input' style={{ marginBottom: '0px' }}>
                                <label>
                                    Escolha a Disciplina:
                                    <select value={disciplina} onChange={handleDisciplinaChange}>
                                        <option value="" disabled selected>Selecione</option>
                                        <option value="Língua Portuguesa">Língua Portuguesa</option>
                                        <option value="Matemática">Matemática</option>
                                        <option value="Ciências">Ciências</option>
                                        <option value="História">História</option>
                                        <option value="Geografia">Geografia</option>
                                        <option value="Educação Física">Educação Física</option>
                                        <option value="Artes">Artes</option>
                                        <option value="Inglês">Inglês</option>
                                    </select>
                                </label>
                            </div>
                            <div className='label-input'>
                                <label>
                                    Tema:
                                    <input className='temaInput' type="text" value={tema} onChange={handleTemaChange} />
                                </label>
                            </div>
                            <div >
                                <label className='container-editor'>
                                    <h4>Conteúdo da Questão:</h4>
                                    <ReactQuill
                                        value={conteudo}
                                        onChange={handleConteudoChange}
                                        modules={{
                                            toolbar: [
                                                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                                ['link', 'image', 'video'],
                                                ['clean'],
                                            ],
                                        }}
                                    />
                                </label>
                            </div>
                            <button className='addButton' type="button" onClick={handleSalvarQuestao}>Salvar Questão</button>
                        </form>
                    </main>
                </main>
            </div>
        </div>
    );
}

export default CriarQuestao;