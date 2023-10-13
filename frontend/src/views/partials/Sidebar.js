import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/Sidebar.css';

function Sidebar({ isSidebarOpen }) {
    return (
        <nav className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
            <span className="home-logo">
                <i className="zmdi zmdi-landscape"></i>
            </span>
            <ul>
                <li><Link to="/home">Início</Link></li>
                <li><Link to="/administracao">Administração de Usuários</Link></li>
                <li><Link to="/diario">Diário</Link></li>
                <li><a href="#">Calendário</a></li>
                <li><a href="#">Notas</a></li>
                <li><a href="#">Atividades</a></li>
                <li><a href="#">Relatórios</a></li>
            </ul>
            
        </nav>
    );
}

export default Sidebar;