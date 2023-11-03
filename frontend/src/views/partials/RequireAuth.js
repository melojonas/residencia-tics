import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { tokenSelector } from '../../app/auth/authSlice';


// TODO: Não é seguro, pois o cookie pode ser alterado pelo usuário
const RequireAuth = () => {
    const location = useLocation();
    const token = useSelector(tokenSelector);

    return (
        token 
            ? <Outlet /> 
            : <Navigate to="/login" state={{ from: location }} replace />
    );

    // Procurar por 't' correspondente ao JWT no cookie
    /* try {
        token = document.cookie.split('; ').find(row => row.startsWith('t=')).split('=')[1];
    } catch (err) {}

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    } */
};

export default RequireAuth;