import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { tokenSelector } from '../../app/auth/authSlice';

const RequireAuth = () => {
    const location = useLocation();
    const token = useSelector(tokenSelector);

    return (
        token 
            ? <Outlet /> 
            : <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;