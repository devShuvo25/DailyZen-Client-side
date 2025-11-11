import React from 'react';
import { PulseLoader } from "react-spinners";

const Spinners = () => {
    return (
        <div className='h-[400px] flex items-center justify-center'>
            <PulseLoader color='#3BB143'></PulseLoader>
        </div>
    );
};

export default Spinners;