import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';

const PrivetRoute = ({children}) => {
    const {user} = useAuth();

    if(!user){
        return <Navigate to={'/login'}></Navigate>
    }
    if(user){
        return children;
    }
};

export default PrivetRoute;