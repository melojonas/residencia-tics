import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Link } from 'react-router-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/pt-br';
import '../css/App.css';
import '../css/Calendario.css';
import Header from './partials/Header.js';
import Sidebar from './partials/Sidebar.js';

moment.locale('pt-br');

const localizer = momentLocalizer(moment);

const customMessages = {
    today: 'Atual',
    next: 'Próximo',
    previous: 'Anterior',
    month: 'Mês',
    week: 'Semana',
    day: 'Dia',
    showMore: total => `+${total} mais`,
};

function Calendario() {

    const [eventos, setEventos] = useState([]); // Estado para armazenar eventos
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
                    <h1>Calendário</h1>

                    <Calendar
                        style={{ height: '720px' }}
                        localizer={localizer}
                        events={eventos} // Passa a lista de eventos para o calendário
                        startAccessor="start"
                        endAccessor="end"
                        messages={customMessages}
                    />
                    
                    <button className='btnAddEvent'>
                        <Link to="/criar-evento">Criar Evento</Link>
                    </button>
                </main>
            </div>
        </div>
    );
}

export default Calendario;
