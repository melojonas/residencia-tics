import React from 'react';
import '../css/Header.css'
import logo from '../images/perfil-logo.png'

function Header({ toggleSidebar }) {
    return (
        <div className="topbar">
            <div className="mobile-menu-button">
                <button id="menu-toggle" onClick={toggleSidebar}>☰</button>
            </div>
            <div className="topbar-content">
                <a href="/login" className="topbar-item">Login</a>
                <img src={logo} alt="Logo" />
            </div>
        </div>
    );
}

export default Header;
