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
                <li><Link className='links' to="/">Início</Link></li>
                <li><Link className='links' to="/administracao">Usuários</Link></li>
                <li><Link className='links' to="/avaliacoes">Avaliações</Link></li>
                <li><a className='links' href="#">Planejamento</a></li>
                <li><a className='links' href="#">Calendário</a></li>
                <li><a className='links' href="#">Relatórios</a></li>
            </ul>
            
        </nav>
    );
}

export default Sidebar;