import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import Spinner from './Component/Spinner';

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(checkUser);
    }, [user]);

    if (loading) {
        return <Spinner />;
    }
    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;