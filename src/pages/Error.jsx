import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowLongLeftIcon, MapIcon } from "@heroicons/react/24/outline";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100 rounded-full -mr-64 -mt-64 blur-3xl opacity-30" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100 rounded-full -ml-64 -mb-64 blur-3xl opacity-30" />
      
      <div className="max-w-xl w-full text-center relative z-10 space-y-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative inline-block"
        >
          <div className="text-[12rem] font-black text-slate-100 leading-none select-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-white rounded-full shadow-2xl shadow-indigo-500/20 flex items-center justify-center border-4 border-slate-50">
               <MapIcon className="w-16 h-16 text-emerald-500 animate-pulse" />
            </div>
          </div>
        </motion.div>

        <div className="space-y-4">
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">Lost in Rotation.</h1>
          <p className="text-slate-500 text-lg font-medium max-w-sm mx-auto">
            The ritual you're looking for doesn't exist here. Even the best of us lose track sometimes.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link 
            to="/" 
            className="my-btn px-10 py-4 flex items-center gap-2 shadow-xl shadow-emerald-500/20"
          >
            <ArrowLongLeftIcon className="w-5 h-5" /> Back to Dashboard
          </Link>
          <p className="text-sm font-bold text-slate-400">Error ID: 0x404_HABIT_MISSING</p>
        </motion.div>
      </div>
    </div>
  );
};

export default ErrorPage;
