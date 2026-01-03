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
    <div className="bg-[#F8FAFC] min-h-screen pb-20">
      <div className="bg-slate-900 pt-32 pb-48 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full -mr-48 -mt-48 blur-3xl" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h1 className="text-4xl lg:text-7xl font-extrabold text-white">My Daily <span className="text-emerald-500">Rituals.</span></h1>
            <p className="text-slate-400 text-lg max-w-xl">Track your progress, build consistency, and watch yourself grow one habit at a time.</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto -mt-24 px-6 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {[
            { label: "Habits Tracking", value: myhabits.length, icon: <CalendarDaysIcon className="w-6 h-6" />, color: "text-emerald-500", bg: "bg-emerald-50" },
            { label: "Today's Goal", value: "Keep Going", icon: <CheckCircleIcon className="w-6 h-6" />, color: "text-amber-500", bg: "bg-amber-50" },
            { label: "Day Streak", value: "Ready", icon: <FireIcon className="w-6 h-6" />, color: "text-indigo-500", bg: "bg-indigo-50" },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 * i }} className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-900/5 flex items-center gap-6">
              <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>{stat.icon}</div>
              <div>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">{stat.label}</p>
                <h2 className="text-2xl font-black text-slate-800">{stat.value}</h2>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
          {isLoading ? <div className="p-20"><Spinners /></div> : (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="bg-slate-50 border-0 h-16">
                    <th className="pl-10 text-slate-500 font-bold uppercase text-xs tracking-widest">Habit Details</th>
                    <th className="text-slate-500 font-bold uppercase text-xs tracking-widest">Category</th>
                    <th className="text-slate-500 font-bold uppercase text-xs tracking-widest">Status</th>
                    <th className="pr-10 text-right text-slate-500 font-bold uppercase text-xs tracking-widest">Manage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {myhabits.map((habit) => (
                    <tr key={habit._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="pl-10 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">{habit.title.charAt(0)}</div>
                          <div>
                            <h3 className="font-bold text-slate-900">{habit.title}</h3>
                            <p className="text-xs text-slate-400 font-medium">Daily Routine</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-wider">{habit.category}</span>
                      </td>
                      <td>
                        {habit.completion_history?.includes(new Date().toISOString().split('T')[0]) ? (
                          <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm"><CheckCircleIcon className="w-5 h-5" /> Done</div>
                        ) : (
                          <button onClick={() => handleComplete(habit._id)} className="text-xs font-bold text-indigo-500 hover:text-indigo-600 underline underline-offset-4">Mark Complete</button>
                        )}
                      </td>
                      <td className="pr-10 py-6 text-right">
                        <div className="flex justify-end gap-2">
                          <Link to={"/update-habit"} state={habit._id} className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-indigo-500 transition-colors"><PencilSquareIcon className="w-5 h-5" /></Link>
                          <button onClick={() => handleDelete(habit._id)} className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-rose-500 transition-colors"><TrashIcon className="w-5 h-5" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {myhabits.length === 0 && (
                    <tr><td colSpan="4" className="p-20 text-center text-slate-400 font-medium">No habits found. Time to start something new!</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        <div className="mt-12 flex justify-between items-center">
          <Link to='/' className="flex items-center gap-2 font-bold text-slate-500 hover:text-slate-900 transition-colors"><ArrowLongLeftIcon className="w-5 h-5" /> Back to Home</Link>
          <Link to='/add-habit' className="my-btn flex items-center gap-2"><PlusIcon className="w-5 h-5" /> Add New Habit</Link>
        </div>
      </div>
    </div>
  );
};

export default MyHabits;
