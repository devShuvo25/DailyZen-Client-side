import React, { useEffect, useState } from 'react';
import CardFrFeatures from './CardFrFeatures';
import { motion } from "framer-motion";
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import Spinners from './Spinners';
import { GrWheelchairActive } from 'react-icons/gr';
import { GiCheckeredFlag } from 'react-icons/gi';
import { CiCalendarDate } from 'react-icons/ci';
import { IoSunnyOutline } from 'react-icons/io5';

const HabitsFeatures = ({children, direction = "left"}) => {
    const [habits,setHabits] = useState([]);
    const {instance} = useAxiosSecure();
    const [isLoading,setIsLoading] = useState(true)
    useEffect(() => {
        instance.get('/latest-fatures')
        .then(result => {
            console.log(result.data);
            setHabits(result.data);
            setIsLoading(false);
        })
    },[instance])
    return (
        <div className='p-5'>
            <h1 className='text-2xl lg:text-5xl font-semibold  text-center'>Latest <span className='color-primary'>Features</span></h1>
            {
                isLoading? <Spinners/> :
            
            <motion.div
             initial={{ y: direction === "to" ? -100 : 100, opacity: 0 }}
             whileInView={{ y: 0, opacity: 1 }}
             viewport={{ once: true, amount: 0.2 }}
             transition={{ duration: 0.8 }}
                 className='my-5 lg:my-10 grid grid-cols-2 lg:grid-cols-3 gap-8'>
                {
                    
                    habits.map(p => <CardFrFeatures p={p}/>)
                    
                }
                {children}
                
                </motion.div>
                }
                <h1 className='text-2xl lg:text-5xl font-semibold text-center mb-10'>Why Build <span className='color-primary'>Habits?</span></h1>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 my-10">
                          <div className="  bg-green-100  flex flex-col items-center justify-center gap-2 rounded-lg">
                            <IoSunnyOutline size={35} className="color-acent" />
                            <p className='text-center opacity-75 text-sm'>Small actions every day lead to big achievements over time.</p>
                            
                          </div>
                          <div className="  bg-green-100  flex flex-col items-center justify-center gap-2 rounded-lg">
                            <CiCalendarDate size={35} className="color-acent" />
                            <p className='text-center opacity-75 text-sm'>Good habits structure your day and reduce decision fatigue.</p>
                          </div>
                          <div className="  bg-green-100  flex flex-col items-center justify-center gap-2 rounded-lg">
                            <GiCheckeredFlag size={35} className="color-acent" />
                           <p className='text-center opacity-75 text-sm'>Mindful habits reduce stress and improve mood.</p>
                          </div>
                          <div className="  bg-green-100 flex flex-col items-center justify-center gap-2 rounded-lg p-4">
                            <GrWheelchairActive size={35} className="color-acent" />
                           <p className='text-center opacity-75 text-sm'>Habits make reaching big goals manageable by breaking them into daily actions.</p>
                          </div>
                        </div>
            
        </div>
    );
};

export default HabitsFeatures;