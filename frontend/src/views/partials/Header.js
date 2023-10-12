import React from "react";
import '../../css/Header.css';
import logo from '../../img/perfil-logo.png';



function Header({ toggleSidebar }) {

    const nome = localStorage.getItem('nome')

    return ( 
        <div className="topbar">
            <div className="mobile-menu-button">
                <button id="menu-toggle" onClick={toggleSidebar}>☰</button>
            </div>
            <div className="topbar-content">                                             
                        <p>{nome}</p>                                                       
                <img src={logo} alt="Logo" />
            </div>
        </div>
    );
} 
export default Header;
