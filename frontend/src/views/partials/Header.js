import React, { useContext } from "react";
import AuthContext from '../../context/auth';
import '../../css/Header.css';
import logo from '../../img/perfil-logo.png';


function Header({ toggleSidebar }) {

    // Get user name from auth context
    // const { user.name } = useContext(AuthContext);
    const { logout } = useContext(AuthContext);

    return ( 
        <div className="topbar">
            <div className="mobile-menu-button">
                <button id="menu-toggle" onClick={toggleSidebar}>☰</button>
            </div>
            <div className="topbar-content">
                <button className="logout-button" onClick={logout}>Logout</button>
                <img src={logo} alt="Logo" />
            </div>
        </div>
    );
} 
export default Header;
