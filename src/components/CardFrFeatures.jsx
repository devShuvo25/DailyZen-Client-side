import React from 'react';
import { Link } from 'react-router';
import { motion } from "framer-motion";


const CardFrFeatures = ({p }) => {
    const{habitName,creator,description} =p;
    return (
        <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
        >
        <div className='bg-white shadow-sm rounded-md p-4  flex flex-col gap-2 '>
            <h1 className='text-2xl text-[#F59E0B]  font-semibold'>{habitName}</h1>
            <p className='text-sm'>{description}</p>
            <span className='opacity-70'>{creator}</span>
            <Link to={'/habit-details'} className='btn btn-outline border-[#3BB143] text-[#3BB143]'>View details</Link>
        </div>
        </motion.div>
    );
};

export default CardFrFeatures;