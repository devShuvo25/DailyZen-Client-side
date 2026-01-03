import React from 'react';
import { motion } from 'framer-motion';

const Spinners = () => {
    return (
        <div className='h-[400px] w-full flex flex-col items-center justify-center gap-6'>
            <div className="relative flex items-center justify-center">
                {/* Outer Rotating Ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 rounded-full border-t-2 border-b-2 border-emerald-500/30"
                />
                
                {/* Inner Pulsing Core */}
                <motion.div
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute w-12 h-12 bg-emerald-500 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center justify-center"
                >
                    <div className="w-4 h-4 bg-white rounded-full animate-pulse" />
                </motion.div>

                {/* Orbiting Dot */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute w-32 h-32 flex items-center justify-start"
                >
                    <div className="w-3 h-3 bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                </motion.div>
            </div>

            <div className="text-center space-y-1">
                <p className="text-slate-900 font-black tracking-[0.2em] uppercase text-xs">Neural Syncing</p>
                <p className="text-slate-400 text-[10px] font-bold">Optimizing your potential...</p>
            </div>
        </div>
    );
};

export default Spinners;