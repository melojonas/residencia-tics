import React, { useState } from 'react';
import '../css/App.css';
import Header from './partials/Header.js';
import Sidebar from './partials/Sidebar.js';

function CriarEvento() {

    const [evento, setEvento] = useState({
        title: '',
        start: null,
        end: null,
    });

    const handleCriarEvento = () => {
        // Validar os detalhes do evento e enviar os dados para a API ou armazenar em outro lugar.
        console.log('Evento criado:', evento);
        // Redirecionar o usuário de volta para a página de calendário.
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
                    <h1>Criar Evento</h1>
                    <div>
                        <input
                            type="text"
                            placeholder="Título do Evento"
                            value={evento.title}
                            onChange={(e) => setEvento({ ...evento, title: e.target.value })}
                        />
                        <input
                            type="datetime-local"
                            placeholder="Data de Início"
                            value={evento.start}
                            onChange={(e) => setEvento({ ...evento, start: e.target.value })}
                        />
                        <input
                            type="datetime-local"
                            placeholder="Data de Término"
                            value={evento.end}
                            onChange={(e) => setEvento({ ...evento, end: e.target.value })}
                        />
                    </div>
                    <button onClick={handleCriarEvento}>Criar Evento</button>
                </main>
            </div>
        </div>
    );
}

export default CriarEvento;