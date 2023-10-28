import React, { createContext, useState } from 'react';
import axios from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        try {
            // Make a request to the server to authenticate the user
            const response = await axios
                .post('/api/auth/login', 
                    JSON.stringify({ email, password }),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );

            // If the response is successful, set the user state to the authenticated user
            const userData = response.data;
            setUser(userData);

        } catch (error) {
            if (!error?.response) {
                throw new Error('Falha ao conectar com o servidor');
            } else if (error.response.status === 401) {
                throw new Error('Usuário ou senha inválidos');
            } else if (error.response.status === 403) {
                throw new Error('Usuário não autorizado');
            } else {
                console.error(error);
            }
        }
    };

    const logout = async () => {
        try {
            // Make a request to the server to log out the user
            const response = await axios
                .get('/api/auth/logout',
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    });
    
            if (response.status === 200) {
                // If the response is successful, set the user state to null
                setUser(null);
                // Refresh the page to clear the context
                window.location.reload();
            } else {
                // If the response is not successful, throw an error
                throw new Error('Failed to log out');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
