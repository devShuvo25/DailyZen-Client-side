import Banner from '../components/Banner';
import useAuth from '../hooks/useAuth';
import HabitsFeatures from '../components/HabitFeatures';
import BadHabits from '../components/BadHabits';
import StartJourney from '../components/Start';
import Spinners from '../components/Spinners';

const Home = () => {
    const {user} = useAuth();
    if(!user){
        console.log('user not found');
        
    }else{
        console.log("user found ",  user.email);
        
    }
    
    return (
        <div>
            <title>DailyZone -Home</title>
            <Banner/>
            <HabitsFeatures/>
            <BadHabits/>
            <StartJourney/>
        </div>
    );
};

export default Home;