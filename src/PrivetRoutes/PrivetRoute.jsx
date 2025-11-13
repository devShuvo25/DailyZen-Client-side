import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import Spinners from '../components/Spinners';

const PrivetRoute = ({children}) => {
    const {user,isLoading} = useAuth();
    const location = useLocation();
    if(isLoading){
        return <Spinners/>
    }
    if(!user){
        return <Navigate to={'/login'} state={location.pathname}></Navigate>
    }
    if(user){
        return children;
    }
};

export default PrivetRoute;