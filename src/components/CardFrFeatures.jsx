import React from 'react';
import { Link } from 'react-router';
import { motion } from "framer-motion";


const CardFrFeatures = ({p}) => {
    const{_id,description,user_name,title} =p;
    return (
        <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
        >
        <div className='bg-white shadow-sm rounded-md p-4 h-[270px] lg:h-[200px] flex flex-col justify-between gap-2 '>
            <h3 className='text-xl lg:text-2xl'>{title}</h3>
            <span className='text-sm color-acent opacity-70'>{user_name}</span>
            <p className='text-sm opacity-75'>{description}</p>
           
            <Link to={'/habit-details'} state={_id} className='btn my-btn'>View Details</Link>
        </div>
        </motion.div>
    );
};

export default CardFrFeatures;