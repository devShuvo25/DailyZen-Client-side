import React, { useEffect, useRef } from 'react';
import useAuth from '../hooks/useAuth';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Link } from 'react-router';
import { 
  UserCircleIcon, 
  EnvelopeIcon, 
  CameraIcon, 
  HashtagIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  ClockIcon,
  PlusIcon,
  ArrowRightIcon,
  FireIcon,
  SparklesIcon,
  CpuChipIcon,
  GlobeAltIcon
} from "@heroicons/react/24/outline";

const Profile = () => {
    const { user } = useAuth();
    const profileRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".profile-header", {
                y: -20,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
            gsap.from(".dashboard-card", {
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.2
            });
        }, profileRef);
        return () => ctx.revert();
    }, []);

    const userStats = [
        { label: "Active Habits", value: "8", icon: <ChartBarIcon className="w-6 h-6" />, color: "emerald", trend: "+2 this week" },
        { label: "Consistency", value: "92%", icon: <ShieldCheckIcon className="w-6 h-6" />, color: "indigo", trend: "Top 5% user" },
        { label: "Current Streak", value: "15 Days", icon: <FireIcon className="w-6 h-6" />, color: "rose", trend: "Personal best!" },
    ];

    return (
        <div ref={profileRef} className="min-h-screen bg-[#F8FAFC] pb-20 overflow-hidden">
            <title>DailyZone - Profile Nexus</title>
            
            {/* Header Section - The Analytics Nexus */}
            <div className="bg-slate-900 pt-28 pb-48 px-4 text-center overflow-hidden relative">
                {/* Immersive Background Architecture */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
                <div className="absolute -top-24 -left-20 w-[600px] h-[600px] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none" />
                <div className="absolute -bottom-24 -right-20 w-[600px] h-[600px] bg-indigo-500/15 rounded-full blur-[140px] pointer-events-none" />
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    className="relative z-10 max-w-4xl mx-auto space-y-4 flex flex-col items-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-emerald-400 font-black text-[10px] tracking-[0.2em] uppercase mb-2 shadow-2xl">
                        <GlobeAltIcon className="w-4 h-4" /> Optimization Hub
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tight leading-none">
                        Profile <span className="text-emerald-500">Nexus.</span>
                    </h1>
                    <p className="text-slate-400 text-sm md:text-lg lg:text-2xl max-w-2xl mx-auto font-medium leading-relaxed px-4">
                        "The consistency of your habits defines the quality of your future."
                    </p>
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-24 sm:-mt-32 lg:-mt-40 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                    
                    {/* LEFT SIDE: Identity & Vitals */}
                    <div className="lg:col-span-4 space-y-6 lg:space-y-8">
                        {/* Main Identity Card */}
                        <div className="dashboard-card bg-white rounded-[2.5rem] sm:rounded-[3.5rem] p-6 sm:p-8 lg:p-12 shadow-2xl shadow-slate-900/10 border border-white relative group overflow-hidden">
                            {/* Card Accent */}
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 to-indigo-500" />
                            
                            <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8">
                                <div className="relative">
                                    <div className="w-36 h-36 sm:w-44 sm:h-44 lg:w-52 lg:h-52 rounded-[2.5rem] sm:rounded-[3.5rem] border-4 sm:border-8 border-white shadow-2xl overflow-hidden ring-1 ring-slate-100 transition-transform duration-700 group-hover:scale-105 group-hover:rotate-2">
                                        <img 
                                            src={user?.photoURL || "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"} 
                                            alt="Profile" 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <button className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 p-3 sm:p-4 bg-slate-900 text-white rounded-2xl sm:rounded-3xl shadow-xl hover:bg-emerald-500 hover:scale-110 transition-all duration-300">
                                        <CameraIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </button>
                                </div>

                                <div className="space-y-6 w-full">
                                    <div className="space-y-2">
                                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-none uppercase truncate px-2">{user?.displayName || "Alpha User"}</h3>
                                        <div className="flex flex-wrap justify-center gap-2 pt-2">
                                            <span className="px-3 py-1 bg-emerald-500 text-white rounded-lg text-[9px] font-black tracking-widest uppercase shadow-lg shadow-emerald-500/20">Elite Tier</span>
                                            <span className="px-3 py-1 bg-slate-900 text-white rounded-lg text-[9px] font-black tracking-widest uppercase">Verified</span>
                                        </div>
                                    </div>
                                    
                                    <div className="pt-4 space-y-3 px-1">
                                        <div className="p-4 sm:p-5 bg-slate-50 rounded-[1.25rem] sm:rounded-[1.5rem] flex items-center gap-4 sm:gap-5 border border-slate-100 group/item hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                                            <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover/item:text-emerald-500 shadow-sm border border-slate-100">
                                                <EnvelopeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </div>
                                            <div className="text-left overflow-hidden">
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Authenticated Email</p>
                                                <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">{user?.email || "private@dailyzone.com"}</p>
                                            </div>
                                        </div>
                                        <div className="p-4 sm:p-5 bg-slate-50 rounded-[1.25rem] sm:rounded-[1.5rem] flex items-center gap-4 sm:gap-5 border border-slate-100 group/item hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                                            <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover/item:text-indigo-500 shadow-sm border border-slate-100">
                                                <HashtagIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </div>
                                            <div className="text-left overflow-hidden">
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Nexus Identifier</p>
                                                <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">DZ-{user?.uid?.slice(0, 10).toUpperCase() || "IDENTITY-LOCKED"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* High-Contrast Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                            {userStats.map((stat, i) => (
                                <div key={i} className="dashboard-card p-5 sm:p-7 bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-white shadow-xl shadow-slate-900/5 flex items-center gap-5 sm:gap-6 group hover:scale-[1.02] transition-all duration-300">
                                    <div className={`w-12 h-12 sm:w-16 sm:h-16 shrink-0 bg-slate-900 text-white rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:bg-emerald-500 transition-colors duration-500 shadow-xl`}>
                                        <div className="w-6 h-6 sm:w-7 sm:h-7">{stat.icon}</div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-2xl sm:text-3xl font-black text-slate-900 leading-none mb-1">{stat.value}</p>
                                        <p className="text-[9px] sm:text-[11px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                                    </div>
                                    <div className="text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border border-emerald-100 uppercase tracking-tighter">
                                        {stat.trend}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT SIDE: Performance Analytics */}
                    <div className="lg:col-span-8 space-y-6 lg:space-y-8">
                        {/* Synaptic Growth Index */}
                        <div className="dashboard-card bg-slate-900 rounded-[2.5rem] sm:rounded-[3.5rem] p-8 sm:p-10 lg:p-16 text-white relative overflow-hidden border border-white/5 shadow-[0_35px_60px_-15px_rgba(15,23,42,0.3)]">
                            {/* Background Visuals */}
                            <div className="absolute top-0 right-0 p-8 sm:p-12 opacity-5 pointer-events-none rotate-12">
                                <SparklesIcon className="w-64 h-64 sm:w-80 sm:h-80" />
                            </div>
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-indigo-500" />
                            
                            <div className="relative z-10 space-y-8 sm:space-y-12">
                                <div className="space-y-4">
                                    <div className="inline-block px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20 text-emerald-400 font-black text-[9px] tracking-widest uppercase">
                                        Evolution Pathway
                                    </div>
                                    <h3 className="text-3xl sm:text-4xl lg:text-6xl font-black leading-[1.1] tracking-tight">
                                        Achieve <span className="text-emerald-400 italic">Structural</span> <br />Consistency.
                                    </h3>
                                </div>

                                <div className="space-y-6 sm:space-y-8">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 sm:gap-6">
                                        <div>
                                            <p className="text-white font-bold text-xs tracking-widest uppercase opacity-40 mb-1">Current Proficiency</p>
                                            <p className="text-5xl sm:text-6xl font-black text-white tracking-tighter">Tier 24</p>
                                        </div>
                                        <div className="md:text-right">
                                            <p className="text-emerald-400 font-black text-3xl sm:text-4xl mb-1">82%</p>
                                            <p className="text-slate-400 font-bold text-[9px] sm:text-[10px] uppercase tracking-widest">Nexus Synchronization</p>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <div className="h-3 sm:h-4 bg-white/5 rounded-full overflow-hidden border border-white/10 group">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: "82%" }}
                                                transition={{ duration: 2, ease: "expoOut" }}
                                                className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.3)] relative" 
                                            >
                                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                                            </motion.div>
                                        </div>
                                        <div className="flex justify-between text-[9px] sm:text-[11px] font-black text-slate-500 uppercase tracking-widest">
                                            <span>Novice Protocol</span>
                                            <span className="text-emerald-500">Mastery Imminent</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Protocols */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                            {/* Manage Protocol */}
                            <Link to="/my-habits" className="dashboard-card group bg-white rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-10 lg:p-12 border border-slate-100 shadow-2xl shadow-slate-900/5 hover:bg-slate-900 transition-all duration-700 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-emerald-500/5 rounded-full -mr-12 -mt-12 group-hover:bg-emerald-500/10 transition-colors" />
                                <div className="space-y-6 sm:space-y-8 relative z-10">
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-slate-50 text-slate-600 rounded-[1.25rem] flex items-center justify-center group-hover:bg-white/10 group-hover:text-emerald-400 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                                        <CpuChipIcon className="w-7 h-7 sm:w-8 sm:h-8" />
                                    </div>
                                    <div className="space-y-2 sm:space-y-3">
                                        <h4 className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-white transition-colors tracking-tight">Active Rituals</h4>
                                        <p className="text-xs sm:text-sm lg:text-base text-slate-500 font-medium group-hover:text-slate-400 transition-colors leading-relaxed">Modify and analyze your current consistency engines for peak performance.</p>
                                    </div>
                                    <div className="flex items-center gap-2 sm:gap-3 text-emerald-600 font-black text-[10px] sm:text-xs uppercase tracking-widest group-hover:text-emerald-400 transition-colors">
                                        System Access <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-3 transition-transform duration-500" />
                                    </div>
                                </div>
                            </Link>

                            {/* Initialization Protocol */}
                            <Link to="/add-habit" className="dashboard-card group bg-white rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-10 lg:p-12 border border-slate-100 shadow-2xl shadow-slate-900/5 hover:bg-emerald-500 transition-all duration-700 relative overflow-hidden">
                                <div className="absolute bottom-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-emerald-500/10 rounded-full -mr-12 -mb-12 group-hover:bg-white/10 transition-colors" />
                                <div className="space-y-6 sm:space-y-8 relative z-10">
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-50 text-emerald-500 rounded-[1.25rem] flex items-center justify-center group-hover:bg-white/20 group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6">
                                        <PlusIcon className="w-7 h-7 sm:w-8 sm:h-8" />
                                    </div>
                                    <div className="space-y-2 sm:space-y-3">
                                        <h4 className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-white transition-colors tracking-tight">New Protocol</h4>
                                        <p className="text-xs sm:text-sm lg:text-base text-slate-500 font-medium group-hover:text-emerald-50 transition-colors leading-relaxed">Initialize a high-impact challenge into your daily biological schedule.</p>
                                    </div>
                                    <div className="flex items-center gap-2 sm:gap-3 text-emerald-600 font-black text-[10px] sm:text-xs uppercase tracking-widest group-hover:text-white transition-colors">
                                        Start Initialization <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-3 transition-transform duration-500" />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
