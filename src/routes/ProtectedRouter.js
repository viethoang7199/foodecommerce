import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../CustomHook/useAuth';

const ProtectedRouter = ({ children }) => {
    const currentUser = useAuth();

    return currentUser ? children : <Navigate to='/login' />
};

export default ProtectedRouter;