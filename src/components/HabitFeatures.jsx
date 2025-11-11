import React, { useEffect, useState } from 'react';
import CardFrFeatures from './CardFrFeatures';
import { motion } from "framer-motion";
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import Spinners from './Spinners';

const HabitsFeatures = ({children, direction = "left"}) => {
    const [habits,setHabits] = useState([]);
    const {instance} = useAxiosSecure();
    const {isLoading} = useAuth();
    useEffect(() => {
        instance.get('/latest-fatures')
        .then(result => {
            console.log(result.data);
            setHabits(result.data);
        })
    },[instance])
    const [dataIm,setDataIm] =useState([]);
 
    useEffect(() => {
        fetch('importance.json')
        .then(res => res.json())
        .then(data => {
            setDataIm(data)
        })

    },[])
  
    
    return (
        <div className='p-5'>
            <h1 className='text-4xl font-semibold  text-center'>Latest <span className='color-primary'>Features</span></h1>
            {
                isLoading? <Spinners/> :
            
            <motion.div
             initial={{ y: direction === "to" ? -100 : 100, opacity: 0 }}
             whileInView={{ y: 0, opacity: 1 }}
             viewport={{ once: true, amount: 0.2 }}
             transition={{ duration: 0.8 }}
                 className='my-10 grid grid-cols-2 lg:grid-cols-3 gap-8'>
                {
                    
                    habits.map(p => <CardFrFeatures p={p}/>)
                    
                }
                {children}
                
                </motion.div>
                }
                <h1 className='text-4xl font-semibold text-center mb-10'>Why Build <span className='color-primary'>Habits?</span></h1>

                <motion.div
                initial={{ x: direction === "to" ? 100 : -100, opacity: 0 }}
             whileInView={{ x: 0, opacity: 1 }}
             viewport={{ once: true, amount: 0.2 }}
             transition={{ duration: 0.8 }}
                className='flex justify-between items-start gap-5'>
                    <motion.div
                    className='w-[50%] p-5 flex flex-col gap-2 bg-white shadow-sm'
                    >
                        <img
                        className='w-full h-[330px]'
                        src="https://static.vecteezy.com/system/resources/thumbnails/022/142/804/original/reading-habit-young-man-who-loves-books-successful-young-man-starting-to-read-a-book-instead-of-spending-time-with-his-smart-phone-at-home-video.jpg" alt="" />
                        <h2 className='text-2xl font-bold'>Why Build <span className='color-primary'>habit?</span></h2>
                        <p className='text-sm opacity-75'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe debitis veritatis repudiandae laudantium sed quam, dolor sequi atque sit maxime modi corrupti similique illo eaque eos quis consequatur voluptatem omnis. Dignissimos quidem et accusantium quae, at cumque sit. Deleniti tenetur voluptatem iusto necessitatibus quasi architecto beatae odit aliquid. Blanditiis eaque totam commodi expedita. Velit aut aliquid .</p>
                    </motion.div>
                   
                    <motion.div
                    initial={{ x: direction === "to" ? -200 : 200, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8 }}
                    className='w-[50%]'
                    >
                        
                        {
                            dataIm.map(eachData => {
                                return <div className='p-4 bg-white shadow-sm my-3'> 
                                    <h2 className='text-lg font-semibold badge badge-warning p-4 mb-2 '>{eachData.title}</h2>
                                    <ul className='opacity-70' >
                                        <li className='text-sm'>{eachData.description}</li>
                                        <li className='text-sm'>{eachData.exampleHabit}</li>
                                    </ul>
                                </div>
                            })
                        }
                    </motion.div>
                </motion.div>
            
        </div>
    );
};

export default HabitsFeatures;