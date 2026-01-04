import React, { useEffect, useState } from "react";
import HabitsCard from "../components/HabitsCard";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useTheme from "../hooks/useTheme";
import Spinners from "../components/Spinners";
import { Link } from "react-router";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import { 
  Squares2X2Icon, 
  FunnelIcon,
  MagnifyingGlassIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

const PublicHabits = () => {
  const { isDark } = useTheme();
  const { instance } = useAxiosSecure();
  const [isLoading, setIsLoading] = useState(true);
  const [habits, setHabits] = useState([]);
  const [filteredHabits, setFilteredHabits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchHabits();
  }, [instance]);

  const fetchHabits = async () => {
    setIsLoading(true);
    try {
      const res = await instance.get("/all-habits");
      setHabits(res.data);
      setFilteredHabits(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let filtered = habits;
    if (searchTerm) {
      filtered = filtered.filter((h) => h.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (selectedCategory !== "All") {
      filtered = filtered.filter((h) => h.category === selectedCategory);
    }
    setFilteredHabits(filtered);
  }, [searchTerm, selectedCategory, habits]);

  return (
    <div className={`min-h-screen pb-20 transition-colors duration-300 ${
      isDark ? 'bg-slate-950' : 'bg-[#F8FAFC]'
    }`}>
      <title>DailyZone - Discover Habits</title>
      
      {/* Header Section */}
      <div className="bg-slate-900 pt-32 pb-56 px-6 text-center overflow-hidden relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -top-24 -left-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="relative z-10 max-w-4xl mx-auto space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-emerald-400 font-black text-[11px] tracking-[0.2em] uppercase mb-4 shadow-2xl">
            <SparklesIcon className="w-4 h-4" /> Global Discovery
          </div>
          <h1 className="text-5xl lg:text-8xl font-black text-white tracking-tight">
            Level Up Your <span className="text-emerald-500">Mindset.</span>
          </h1>
          <p className="text-slate-400 text-lg lg:text-2xl max-w-2xl mx-auto font-medium leading-relaxed">
            Join thousands of others in building life-changing routines. 
            Discover, adapt, and master your future.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto -mt-32 px-6 relative z-20">
        {/* Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }} 
          className={`backdrop-blur-2xl p-4 lg:p-7 rounded-[2.5rem] shadow-2xl mb-16 flex flex-col md:flex-row gap-5 items-center border transition-colors duration-300 ${
            isDark 
              ? 'bg-slate-800/95 shadow-slate-900/50 border-slate-700' 
              : 'bg-white/95 shadow-slate-900/10 border-white/40'
          }`}
        >
          {/* Search Field */}
          <div className="flex-1 w-full">
            <div className={`input-group group/input border-2 border-transparent transition-all duration-300 focus-within:border-emerald-500/30 focus-within:shadow-xl focus-within:shadow-emerald-500/10 ring-0 ${
              isDark 
                ? 'bg-slate-700 focus-within:bg-slate-600' 
                : 'bg-slate-50 focus-within:bg-white'
            }`}>
              <MagnifyingGlassIcon className="input-icon w-6 h-6 text-emerald-500/40 group-focus-within/input:text-emerald-500 group-focus-within/input:scale-110 transition-all drop-shadow-[0_0_8px_rgba(16,185,129,0.2)]" />
              <input 
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field py-5 text-lg font-bold placeholder:text-slate-300"
                placeholder="Find your next habit..."
              />
            </div>
          </div>
          
          {/* Category Filter */}
          <div className="w-full md:w-80">
            <div className={`input-group group/input border-2 border-transparent pr-4 transition-all duration-300 focus-within:border-indigo-500/30 focus-within:shadow-xl focus-within:shadow-indigo-500/10 ring-0 ${
              isDark 
                ? 'bg-slate-700 focus-within:bg-slate-600' 
                : 'bg-slate-50 focus-within:bg-white'
            }`}>
              <FunnelIcon className="input-icon w-6 h-6 text-indigo-500/40 group-focus-within/input:text-indigo-500 group-focus-within/input:scale-110 transition-all drop-shadow-[0_0_8px_rgba(99,102,241,0.2)]" />
              <select 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field py-5 font-black appearance-none cursor-pointer text-lg tracking-tight"
              >
                <option value="All">All Disciplines</option>
                <option value="Morning">Morning Rituals</option>
                <option value="Health">Physical Health</option>
                <option value="Productivity">Deep Productivity</option>
                <option value="Evening">Rest & Reflection</option>
                <option value="Skill Development">Skill Mastery</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        {isLoading ? (
          <div className="py-40 flex flex-col items-center justify-center space-y-4">
            <Spinners />
            <p className={`font-black animate-pulse uppercase tracking-widest text-xs transition-colors duration-300 ${
              isDark ? 'text-slate-500' : 'text-slate-400'
            }`}>Curating habits for you...</p>
          </div>
        ) : (
          <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 px-4 gap-4">
              <div className="space-y-2">
                <div className="w-12 h-1.5 bg-emerald-500 rounded-full mb-4" />
                <h2 className={`text-3xl lg:text-4xl font-black tracking-tight transition-colors duration-300 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-indigo-600">Possibilities.</span>
                </h2>
                <p className={`font-bold italic tracking-wide transition-colors duration-300 ${
                  isDark ? 'text-slate-400' : 'text-slate-400'
                }`}>
                  Showing {filteredHabits.length} curated habits from the community
                </p>
              </div>
              
              <div className={`hidden lg:flex items-center gap-2 px-4 py-2 rounded-2xl text-[11px] font-black uppercase tracking-widest border transition-colors duration-300 ${
                isDark 
                  ? 'bg-slate-800 text-slate-400 border-slate-700' 
                  : 'bg-slate-100 text-slate-400 border-slate-200'
              }`}>
                <Squares2X2Icon className="w-4 h-4" /> Grid View Enabled
              </div>
            </div>
            
            <AnimatePresence mode="popLayout">
              {filteredHabits.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
                  {filteredHabits.map((habit, idx) => (
                    <motion.div 
                      key={habit._id} 
                      layout
                      initial={{ opacity: 0, y: 30 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ 
                        duration: 0.4,
                        delay: idx * 0.05,
                        type: "spring",
                        damping: 20
                      }}
                    >
                      <HabitsCard habit={habit} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className={`text-center py-48 rounded-[4rem] border-4 border-dashed flex flex-col items-center justify-center shadow-inner transition-colors duration-300 ${
                    isDark 
                      ? 'bg-slate-800 border-slate-700' 
                      : 'bg-white border-slate-50'
                  }`}
                >
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-colors duration-300 ${
                    isDark ? 'bg-slate-700 text-slate-600' : 'bg-slate-100 text-slate-300'
                  }`}>
                    <MagnifyingGlassIcon className="w-10 h-10" />
                  </div>
                  <h3 className={`text-2xl font-black mb-2 transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-800'
                  }`}>No Habits Found</h3>
                  <p className={`font-bold max-w-sm mx-auto leading-relaxed transition-colors duration-300 ${
                    isDark ? 'text-slate-400' : 'text-slate-400'
                  }`}>
                    We couldn't find any habits matching your current filter. Try broadening your search!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="mt-12 text-center pb-12">
          <Link to="/" className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-black shadow-sm border transition-all hover:shadow-xl hover:-translate-y-1 ${
            isDark 
              ? 'bg-slate-800 text-slate-400 hover:text-emerald-400 border-slate-700' 
              : 'bg-white text-slate-500 hover:text-emerald-600 border-slate-100'
          }`}>
            <FaArrowLeft className="text-xs" /> Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PublicHabits;
