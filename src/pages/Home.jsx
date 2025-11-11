// import React, { use } from 'react';
import { Features } from 'tailwindcss';
import Banner from '../components/Banner';
import { AuthContext } from '../context/AuthContext';
import useAuth from '../hooks/useAuth';
import HabitsFeatures from '../components/HabitFeatures';
import BadHabits from '../components/BadHabits';
import BadHabitsCard from '../components/BadHabitsCard';
import StartJourney from '../components/Start';

const Home = () => {
    const {user} = useAuth();
    if(!user){
        console.log('user not found');
        
    }else{
        console.log("user found ",  user.email);
        
    }
    
    return (
        <div>
            <Banner/>
            <HabitsFeatures/>
            <BadHabits/>
            <StartJourney/>
        </div>
    );
};

export default Home;