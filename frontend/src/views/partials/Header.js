import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import '../../css/Header.css';
import logo from '../../img/perfil-logo.png';
import { userSelector, logout } from '../../app/auth/authSlice';
import { useLogoutMutation } from '../../app/auth/authAPI';


function Header({ toggleSidebar }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [logoutMutation] = useLogoutMutation();
    const dispatch = useDispatch();
    
    const user = useSelector(userSelector);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = async () => {
        try {
            await logoutMutation().unwrap();
            dispatch(logout());
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="topbar">
            <div className="mobile-menu-button">
                <button id="menu-toggle" onClick={toggleSidebar}>☰</button>
            </div>
            <div className="topbar-content">
                <p>{user.name}</p>
                <div className="header-logo" onClick={toggleDropdown}>
                    <img src={logo} alt="Logo" />
                    {isDropdownOpen && (
                        <div className="dropdown-menu">
                            <button onClick={handleLogout}>Logout</button>
                            {/* Adicionar outras opções do menu aqui */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
