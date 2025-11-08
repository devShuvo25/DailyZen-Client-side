// import React, { use } from 'react';
import { AuthContext } from '../context/AuthContext';
import useAuth from '../hooks/useAuth';

const Home = () => {
    const {user} = useAuth();
    if(!user){
        console.log('user not found');
        
    }else{
        console.log("user found ",  user.email);
        
    }
    
    return (
        <div>
            <h1>This is the home page</h1>
        </div>
    );
};

export default Home;