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
        <div ref={profileRef} className="min-h-screen bg-[#F8FAFC] pb-24 overflow-hidden">
            {/* Analytics Nexus Header (Dark/Professional) */}
            <div className="bg-slate-900 pt-32 pb-48 px-6 text-center overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                
                {/* Visual Pulse / Pattern */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px]" />
                <div className="absolute top-0 right-0 p-12 opacity-5">
                    <CpuChipIcon className="w-96 h-96 text-white" />
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 max-w-4xl mx-auto space-y-6 flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20 text-emerald-400 font-bold text-sm tracking-widest uppercase mb-4">
                        <GlobeAltIcon className="w-4 h-4" /> Personal Evolution Portal
                    </div>
                    <h1 className="text-4xl lg:text-7xl font-extrabold text-white tracking-tight">
                        Analytics <span className="text-emerald-500">Nexus.</span>
                    </h1>
                    <p className="text-slate-400 text-lg lg:text-xl max-w-2xl mx-auto font-medium">
                        "Your routine is your destiny. Master the data of your daily evolution."
                    </p>
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* LEFT: Profile Overview */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Main Info Card */}
                        <div className="dashboard-card bg-white rounded-[3rem] p-10 shadow-2xl shadow-slate-900/5 border border-slate-100 overflow-hidden relative group">
                            <div className="flex flex-col items-center text-center space-y-6">
                                <div className="relative">
                                    <div className="w-40 h-40 lg:w-48 lg:h-48 rounded-[3rem] border-8 border-white shadow-2xl overflow-hidden ring-1 ring-slate-100 mt-[-6rem] lg:mt-[-8rem] transition-transform duration-500 group-hover:scale-105">
                                        <img 
                                            src={user?.photoURL || "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"} 
                                            alt="Profile" 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <button className="absolute bottom-4 right-4 p-3 bg-emerald-500 text-white rounded-2xl shadow-lg hover:bg-emerald-400 hover:scale-110 transition-all">
                                        <CameraIcon className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="space-y-4 w-full">
                                    <div className="space-y-1">
                                        <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none">{user?.displayName || "Elite User"}</h3>
                                        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Growth Architect</p>
                                    </div>
                                    <div className="flex justify-center gap-2">
                                        <div className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black tracking-widest uppercase border border-emerald-100">
                                            Premium Peer
                                        </div>
                                        <div className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black tracking-widest uppercase border border-slate-200">
                                            Lvl 24
                                        </div>
                                    </div>
                                    
                                    <div className="pt-6 space-y-4">
                                        <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-4 border border-slate-100">
                                            <EnvelopeIcon className="w-5 h-5 text-slate-400" />
                                            <span className="text-sm font-bold text-slate-600 truncate">{user?.email || "No email linked"}</span>
                                        </div>
                                        <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-4 border border-slate-100">
                                            <HashtagIcon className="w-5 h-5 text-slate-400" />
                                            <span className="text-sm font-bold text-slate-600">DZ-ID: {user?.uid?.slice(0, 10).toUpperCase() || "DZ-AUTH-XX"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-1 gap-4">
                            {userStats.map((stat, i) => (
                                <div key={i} className="dashboard-card p-6 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-900/5 flex items-center gap-6 group hover:border-emerald-200 transition-colors">
                                    <div className={`w-14 h-14 shrink-0 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors`}>
                                        {stat.icon}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-2xl font-black text-slate-900 leading-none mb-1">{stat.value}</p>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                                    </div>
                                    <div className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">
                                        {stat.trend}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Detailed Insights & Actions */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Level Progress (Synaptic Growth) */}
                        <div className="dashboard-card bg-slate-900 rounded-[3rem] p-10 lg:p-14 text-white relative overflow-hidden border border-white/5 shadow-2xl">
                            <div className="absolute top-1/2 right-0 -translate-y-1/2 p-12 opacity-5 pointer-events-none">
                                <SparklesIcon className="w-64 h-64" />
                            </div>
                            <div className="relative z-10 space-y-10">
                                <div className="space-y-3">
                                    <h4 className="text-emerald-400 font-black tracking-[0.2em] uppercase text-xs">Synaptic Growth Index</h4>
                                    <h3 className="text-3xl lg:text-5xl font-black leading-tight tracking-tight">Evolving into <br /><span className="text-emerald-400">Superior Rituals.</span></h3>
                                </div>
                                <div className="space-y-6">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-4xl font-black text-white">Tier 24</p>
                                            <p className="text-slate-400 font-bold text-sm tracking-wide">450 XP until next synchronization</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-emerald-400 font-black text-2xl">82%</p>
                                            <p className="text-slate-400 font-bold text-sm tracking-wide">Sync Probability</p>
                                        </div>
                                    </div>
                                    <div className="h-6 bg-white/5 rounded-full overflow-hidden p-1.5 border border-white/10">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: "82%" }}
                                            transition={{ duration: 1.5, ease: "expoOut" }}
                                            className="h-full bg-emerald-500 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)]" 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Action Card 1 */}
                            <Link to="/my-habits" className="dashboard-card group bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-900/5 hover:bg-slate-900 transition-all duration-500">
                                <div className="space-y-6">
                                    <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-white/10 group-hover:text-emerald-400 transition-colors">
                                        <PlusIcon className="w-8 h-8" />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-2xl font-black text-slate-900 group-hover:text-white transition-colors">Manage Rituals</h4>
                                        <p className="text-slate-500 font-medium group-hover:text-slate-400 transition-colors">Fine-tune and analyze your existing consistency engines.</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-emerald-500 font-black text-xs uppercase tracking-widest group-hover:text-white transition-colors">
                                        Access Dashboard <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                    </div>
                                </div>
                            </Link>

                            {/* Action Card 2 */}
                            <Link to="/add-habit" className="dashboard-card group bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-900/5 hover:bg-emerald-500 transition-all duration-500">
                                <div className="space-y-6">
                                    <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center group-hover:bg-white/20 group-hover:text-white transition-colors">
                                        <SparklesIcon className="w-8 h-8" />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-2xl font-black text-slate-900 group-hover:text-white transition-colors">New Challenge</h4>
                                        <p className="text-slate-500 font-medium group-hover:text-white/80 transition-colors">Initiate a high-impact habit into your daily protocol.</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-emerald-500 font-black text-xs uppercase tracking-widest group-hover:text-white transition-colors">
                                        Start Initialization <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
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
