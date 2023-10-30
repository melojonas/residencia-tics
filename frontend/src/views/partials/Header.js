import React, { useContext, useState } from "react";
import AuthContext from '../../context/auth';
import '../../css/Header.css';
import logo from '../../img/perfil-logo.png';

function Header({ toggleSidebar }) {
    const { logout } = useContext(AuthContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="topbar">
            <div className="mobile-menu-button">
                <button id="menu-toggle" onClick={toggleSidebar}>☰</button>
            </div>
            <div className="topbar-content">
                <div className="header-logo" onClick={toggleDropdown}>
                    <img src={logo} alt="Logo" />
                    {isDropdownOpen && (
                        <div className="dropdown-menu">
                            <button onClick={logout}>Logout</button>
                            {/* Adicionar outras opções do menu aqui */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
