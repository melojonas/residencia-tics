import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/pt-br';
import '../css/App.css';
import '../css/Calendario.css';
import Header from './partials/Header.js';
import Sidebar from './partials/Sidebar.js';

moment.locale('pt-br');

const localizer = momentLocalizer(moment);

function Calendario() {
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
                    <Calendar style={{height: '720px'}}
                        localizer={localizer}
                        events={[
                            {
                                title: 'Evento 1',
                                start: new Date(2023, 10, 20),
                                end: new Date(2023, 10, 22),
                            },
                            // Adicionar mais eventos conforme necessário
                        ]}
                        startAccessor="start"
                        endAccessor="end"
                    />
                </main>
            </div>
        </div>
    );
}

export default Calendario;
