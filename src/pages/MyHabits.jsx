import React, { useEffect, useState } from "react";
import { 
  TrashIcon, 
  PencilSquareIcon, 
  CheckCircleIcon,
  CalendarDaysIcon,
  FireIcon,
  PlusIcon,
  UserIcon,
  ArrowLongLeftIcon
} from "@heroicons/react/24/outline";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import Spinners from "../components/Spinners";
import { motion } from "framer-motion";

const MyHabits = () => {
  const { instance } = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [myhabits, setMyHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const today = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

  useEffect(() => {
    fetchData();
  }, [instance, user]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await instance.get(`/my-habits?email=${user?.email}`);
      setMyHabits(result.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Remove Habit?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#64748B",
    }).then((result) => {
      if (result.isConfirmed) {
        instance.delete(`/delet-this-habit/${id}`).then((res) => {
          if (res.data.deletedCount) {
            setMyHabits(prev => prev.filter(h => h._id !== id));
            Swal.fire({ title: "Deleted", icon: "success", timer: 1500, showConfirmButton: false });
          }
        });
      }
    });
  };

  const handleComplete = (id) => {
    instance.patch(`/habits-complete/${id}`)
      .then(() => {
        Swal.fire({ title: "Great Job!", text: "Daily task completed.", icon: "success", timer: 1500, showConfirmButton: false });
        fetchData();
      })
      .catch((err) => {
        if(err.response?.data) {
          Swal.fire({ icon: "info", title: "Wait!", text: "Already completed today.", confirmButtonColor: "#10B981" });
        }
      });
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-24">
      <title>DailyZone - My Rituals</title>
      
      {/* Header Section */}
      <div className="bg-slate-900 pt-32 pb-60 px-6 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] -ml-64 -mb-64 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20 text-emerald-400 font-black text-[10px] tracking-[0.2em] uppercase">
              <CalendarDaysIcon className="w-4 h-4" /> Personal Dashboard
            </div>
            <h1 className="text-5xl lg:text-8xl font-black text-white tracking-tight">
              Master Your <span className="text-emerald-500">Rituals.</span>
            </h1>
            <p className="text-slate-400 text-lg lg:text-2xl max-w-2xl font-medium leading-relaxed">
              Tracking is the first step to mastery. Consistently showing up 
              is how you redefine who you are.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto -mt-32 px-4 sm:px-6 relative z-20">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            { label: "Active Rituals", value: myhabits.length, icon: <CalendarDaysIcon className="w-7 h-7" />, color: "text-emerald-500", bg: "bg-emerald-50" },
            { label: "Daily Objective", value: "Keep Pushing", icon: <CheckCircleIcon className="w-7 h-7" />, color: "text-amber-500", bg: "bg-amber-50" },
            { label: "Ritual Streak", value: "Ready", icon: <FireIcon className="w-7 h-7" />, color: "text-indigo-500", bg: "bg-indigo-50" },
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ delay: 0.1 * i }} 
              className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-xl shadow-slate-900/5 flex items-center gap-8 border border-white"
            >
              <div className={`w-16 h-16 rounded-[1.25rem] ${stat.bg} ${stat.color} flex items-center justify-center shadow-inner`}>{stat.icon}</div>
              <div className="space-y-1">
                <p className="text-slate-400 font-black text-[11px] uppercase tracking-widest leading-none">{stat.label}</p>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</h2>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Content Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-white rounded-[3rem] shadow-2xl shadow-slate-900/5 border border-slate-50 overflow-hidden"
        >
          {isLoading ? (
            <div className="p-32 flex flex-col items-center justify-center space-y-4">
              <Spinners />
              <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">Assembling your rituals...</p>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="table w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100 h-20">
                      <th className="pl-12 text-slate-400 font-black uppercase text-[11px] tracking-widest text-left">Habit Architecture</th>
                      <th className="text-slate-400 font-black uppercase text-[11px] tracking-widest text-left">Classification</th>
                      <th className="text-slate-400 font-black uppercase text-[11px] tracking-widest text-left">Current Status</th>
                      <th className="pr-12 text-right text-slate-400 font-black uppercase text-[11px] tracking-widest">Action Center</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {myhabits.map((habit) => (
                      <tr key={habit._id} className="group hover:bg-slate-50/50 transition-all duration-300">
                        <td className="pl-12 py-8">
                          <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-500/5 flex items-center justify-center text-emerald-600 font-black text-xl shadow-inner border border-emerald-500/10 transition-transform group-hover:scale-110">
                              {habit.title.charAt(0)}
                            </div>
                            <div>
                              <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-emerald-600 transition-colors uppercase tracking-tight">{habit.title}</h3>
                              <p className="text-xs text-slate-400 font-bold tracking-wide italic">Personal Growth Protocol</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="px-4 py-1.5 bg-slate-100 text-slate-500 rounded-[10px] text-[10px] font-black uppercase tracking-widest border border-slate-200/50">{habit.category}</span>
                        </td>
                        <td>
                          {habit.completion_history?.includes(new Date().toISOString().split('T')[0]) ? (
                            <div className="flex items-center gap-2.5 text-emerald-500 font-black text-[13px] uppercase tracking-wider">
                              <CheckCircleIcon className="w-6 h-6" /> Success Today
                            </div>
                          ) : (
                            <button 
                              onClick={() => handleComplete(habit._id)} 
                              className="px-5 py-2 rounded-xl bg-indigo-50 text-indigo-600 font-black text-[11px] uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-sm active:scale-95"
                            >
                              Finalize Task
                            </button>
                          )}
                        </td>
                        <td className="pr-12 py-8 text-right">
                          <div className="flex justify-end gap-3 translate-x-0 transition-all">
                            <Link to={"/update-habit"} state={habit._id} className="p-3 rounded-xl bg-white text-slate-400 hover:text-emerald-500 border border-slate-100 hover:border-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/10 transition-all">
                              <PencilSquareIcon className="w-5 h-5" />
                            </Link>
                            <button onClick={() => handleDelete(habit._id)} className="p-3 rounded-xl bg-white text-slate-400 hover:text-rose-500 border border-slate-100 hover:border-rose-500/20 hover:shadow-lg hover:shadow-rose-500/10 transition-all">
                              <TrashIcon className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card List View */}
              <div className="lg:hidden p-4 space-y-4">
                {myhabits.map((habit) => (
                  <div key={habit._id} className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100 space-y-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-emerald-500/20">
                          {habit.title.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-extrabold text-slate-900 uppercase tracking-tight leading-none mb-1">{habit.title}</h3>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{habit.category}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link to={"/update-habit"} state={habit._id} className="p-2.5 rounded-xl bg-white text-slate-400 border border-slate-100 shadow-sm active:scale-95">
                          <PencilSquareIcon className="w-5 h-5" />
                        </Link>
                        <button onClick={() => handleDelete(habit._id)} className="p-2.5 rounded-xl bg-white text-slate-400 border border-slate-100 shadow-sm active:scale-95">
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Progress Status</span>
                      {habit.completion_history?.includes(new Date().toISOString().split('T')[0]) ? (
                        <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm">
                          <CheckCircleIcon className="w-5 h-5" /> Done Today
                        </div>
                      ) : (
                        <button 
                          onClick={() => handleComplete(habit._id)} 
                          className="px-6 py-2.5 rounded-2xl bg-indigo-600 text-white font-black text-[11px] uppercase tracking-widest shadow-lg shadow-indigo-600/20 active:scale-95"
                        >
                          Mark as Done
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {myhabits.length === 0 && (
                <div className="p-32 text-center flex flex-col items-center justify-center space-y-6">
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 border border-slate-100">
                    <CalendarDaysIcon className="w-12 h-12" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-800 tracking-tight">Ritual List Empty</h3>
                    <p className="text-slate-400 font-bold max-w-xs mx-auto">Design your future by adding your first daily habit.</p>
                  </div>
                  <Link to='/add-habit' className="my-btn inline-flex items-center gap-2 shadow-xl">
                    <PlusIcon className="w-5 h-5" /> Create New Ritual
                  </Link>
                </div>
              )}
            </>
          )}
        </motion.div>

        {/* Footer Navigation */}
        <div className="mt-16 flex flex-col sm:flex-row justify-between items-center gap-8">
          <Link to='/' className="flex items-center gap-3 font-black text-slate-500 hover:text-emerald-600 transition-all group">
            <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100 group-hover:shadow-md transition-all">
              <ArrowLongLeftIcon className="w-5 h-5" />
            </div>
            Back to Dashboard
          </Link>
          <Link to='/add-habit' className="w-full sm:w-auto px-10 py-5 bg-slate-900 text-white font-black text-lg rounded-[1.5rem] flex items-center justify-center gap-3 shadow-2xl shadow-slate-900/40 hover:bg-emerald-600 transition-all hover:-translate-y-1 active:scale-95">
            <PlusIcon className="w-6 h-6" /> Build New Habit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyHabits;
