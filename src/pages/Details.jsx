import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { motion } from "framer-motion";
import { 
  ArrowLeftIcon, 
  CalendarIcon, 
  FireIcon, 
  CheckCircleIcon,
  UserCircleIcon,
  EnvelopeIcon,
  TagIcon
} from "@heroicons/react/24/outline";

const Details = () => {
  const { user } = useAuth();
  const location = useLocation();
  const { instance } = useAxiosSecure();
  const [currentHabit, setCurrentHabit] = useState(null);
  const [progressDayCount, setProgressDayCount] = useState(0);

  const getLast30DaysCompletion = (completedDates) => {
    if (!completedDates) return 0;
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    return completedDates.filter(dateStr => {
      const date = new Date(dateStr);
      return date >= thirtyDaysAgo && date <= today;
    }).length;
  };

  useEffect(() => {
    if (currentHabit?.completion_history) {
      setProgressDayCount(getLast30DaysCompletion(currentHabit.completion_history));
    }
  }, [currentHabit]);

  useEffect(() => {
    instance.get(`/current-product/${location.state}`)
      .then((res) => setCurrentHabit(res.data))
      .catch((err) => console.error(err));
  }, [instance, location.state]);

  const handleComplete = (id) => {
    instance.patch(`/habits-complete/${id}`)
      .then((res) => {
        if (res.data) {
          setCurrentHabit(prev => ({
            ...prev,
            current_streak: res.data.streak,
            completion_history: res.data.completion_history
          }));
          Swal.fire({
            title: "Crushed It!",
            text: "Your daily goal is complete.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
            background: "#ffffff",
          });
        }
      })
      .catch((err) => {
        if (err.response?.data) {
          Swal.fire({
            icon: "info",
            title: "Stay Consistent!",
            text: "You've already done this today.",
            confirmButtonColor: "#10B981"
          });
        }
      });
  };

  const percentage = Math.min((progressDayCount / 30) * 100, 100);

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20 pt-32 px-6">
      <title>DailyZone - Habit Details</title>
      <div className="max-w-6xl mx-auto">
        <Link to={-1} className="inline-flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors mb-8 group">
          <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to previous
        </Link>

        <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-900/5 overflow-hidden border border-slate-100">
          <div className="flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="lg:w-2/5 relative h-[400px] lg:h-auto overflow-hidden">
              <img 
                src={currentHabit?.image || "https://images.unsplash.com/photo-1493839523149-2864fca44919?q=80&w=1200"} 
                className="w-full h-full object-cover"
                alt={currentHabit?.title}
              />
              <div className="absolute inset-0 bg-slate-900/60" />
              <div className="absolute bottom-8 left-8">
                <span className="px-4 py-1.5 bg-emerald-500 text-white text-xs font-bold rounded-full uppercase tracking-widest shadow-lg">
                  {currentHabit?.category || "Goal"}
                </span>
                <h1 className="text-3xl lg:text-4xl font-black text-white mt-4">{currentHabit?.title}</h1>
              </div>
            </div>

            {/* Content Section */}
            <div className="lg:w-3/5 p-8 lg:p-16 flex flex-col justify-between">
              <div className="space-y-12">
                <div className="flex flex-col md:flex-row items-center gap-12">
                   <div className="w-32 h-32 flex-shrink-0">
                     <CircularProgressbar
                       value={percentage}
                       text={`${Math.round(percentage)}%`}
                       strokeWidth={10}
                       styles={buildStyles({
                         textSize: '20px',
                         pathColor: '#10B981',
                         textColor: '#0F172A',
                         trailColor: '#F1F5F9',
                         strokeLinecap: 'round'
                       })}
                     />
                     <p className="text-center text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-4">30-Day Progress</p>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-8 w-full">
                     <div className="space-y-1">
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                         <FireIcon className="w-4 h-4 text-amber-500" /> Current Streak
                       </p>
                       <p className="text-2xl font-black text-slate-800">{currentHabit?.current_streak || 0} Days</p>
                     </div>
                     <div className="space-y-1">
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                         <CalendarIcon className="w-4 h-4 text-emerald-500" /> Started On
                       </p>
                       <p className="text-lg font-bold text-slate-800">{currentHabit?.created_at ? new Date(currentHabit.created_at).toLocaleDateString() : 'N/A'}</p>
                     </div>
                   </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <TagIcon className="w-4 h-4" /> Motivation & Description
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-lg italic">"{currentHabit?.description}"</p>
                </div>

                <div className="pt-8 border-t border-slate-50 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <UserCircleIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Creator</p>
                      <p className="text-sm font-bold text-slate-800">{currentHabit?.user_name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <EnvelopeIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Contact</p>
                      <p className="text-sm font-bold text-slate-800">{currentHabit?.user_email}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                {currentHabit?.completion_history?.includes(new Date().toISOString().split('T')[0]) ? (
                   <div className="w-full py-5 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center gap-2 font-bold shadow-sm border border-emerald-100">
                     <CheckCircleIcon className="w-6 h-6" /> Completed for Today
                   </div>
                ) : (
                  <button 
                    onClick={() => handleComplete(currentHabit?._id)} 
                    className="w-full my-btn py-5 text-lg font-black tracking-widest shadow-xl shadow-emerald-500/20"
                  >
                    Mark as Done Today
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
