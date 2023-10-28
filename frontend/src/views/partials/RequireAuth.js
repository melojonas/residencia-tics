import { useLocation, Navigate, Outlet } from 'react-router-dom';


// TODO: Não é seguro, pois o cookie pode ser alterado pelo usuário
const RequireAuth = () => {
    const location = useLocation();
    let token = null;

    // Procurar por 't' correspondente ao JWT no cookie
    try {
        token = document.cookie.split('; ').find(row => row.startsWith('t=')).split('=')[1];
    } catch (err) {}

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default RequireAuth;