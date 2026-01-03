import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useLocation, useNavigate, Link } from "react-router";
import Swal from "sweetalert2";
import { 
  PencilSquareIcon, 
  CalendarIcon, 
  ClockIcon, 
  PhotoIcon, 
  ChatBubbleBottomCenterTextIcon,
  ArrowLeftIcon
} from "@heroicons/react/24/outline";

const UpdateHabit = () => {
  const { user } = useAuth();
  const location = useLocation();
  const { instance } = useAxiosSecure();
  const [currentHabit, setCurrentHabit] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    instance.get(`/current-product/${location.state}`)
      .then((res) => setCurrentHabit(res.data))
      .catch((err) => console.error(err));
  }, [instance, location.state]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedHabit = {
      title: e.target.title.value,
      description: e.target.description.value,
      category: e.target.category.value,
      reminderTime: e.target.time.value,
      image: e.target.image.value,
      user_email: user?.email,
      user_name: user?.displayName,
    };

    Swal.fire({
      title: "Save Changes?",
      text: "Your progress and history will be preserved.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10B981",
      cancelButtonColor: "#64748B",
      confirmButtonText: "Update Habit",
      background: "#ffffff",
    }).then((result) => {
      if (result.isConfirmed) {
        instance.patch(`/update-my-habit/${currentHabit._id}`, updatedHabit)
          .then((res) => {
            if (res.data.modifiedCount) {
              Swal.fire({ title: "Updated!", text: "Changes saved successfully.", icon: "success", timer: 1500, showConfirmButton: false });
              navigate('/my-habits');
            }
          });
      }
    });
  };

  if (!currentHabit) return <div className="min-h-screen flex justify-center items-center"><div className="loading loading-spinner loading-lg text-emerald-500"></div></div>;

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-12 lg:py-20 px-4">
      <title>DailyZone - Update Habit</title>
      
      <div className="max-w-4xl mx-auto">
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-1"
          >
            <Link to="/my-habits" className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-500 font-bold transition-colors text-sm mb-4">
              <FaArrowLeft className="text-xs" /> Back to My Habits
            </Link>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Refine Your <span className="text-emerald-500">Habit</span>
            </h1>
            <p className="text-slate-500 font-medium tracking-wide flex items-center gap-2">
              <span className="w-8 h-[1px] bg-slate-200" />
              Adjustment is part of growth. Keep evolving.
            </p>
          </motion.div>

          {/* Edit Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 bg-white p-3 pr-6 rounded-2xl shadow-sm border border-slate-100 self-start"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 shadow-inner ring-2 ring-emerald-500/10">
              <PencilSquareIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-tighter">Editing mode</p>
              <p className="text-sm font-bold text-slate-900">Updating Details</p>
            </div>
          </motion.div>
        </div>

        {/* Main Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white p-8 lg:p-12"
        >
          <form onSubmit={handleUpdate} className="space-y-10">
            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              
              {/* Habit Title - Span 2 */}
              <div className="md:col-span-2 group/field">
                <label className="block text-[13px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1 group-focus-within/field:text-emerald-500 transition-colors">
                  Habit Title
                </label>
                <div className="input-group group">
                  <PencilSquareIcon className="input-icon" />
                  <input
                    required
                    name="title"
                    defaultValue={currentHabit.title}
                    placeholder="E.g., Morning Deep Work Session"
                    className="input-field text-lg"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="group/field">
                <label className="block text-[13px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1 group-focus-within/field:text-emerald-500 transition-colors">
                  Category
                </label>
                <div className="input-group group pr-4 cursor-pointer">
                  <CalendarIcon className="input-icon" />
                  <select
                    name="category"
                    defaultValue={currentHabit.category}
                    className="input-field appearance-none cursor-pointer"
                  >
                    <option>Morning</option>
                    <option>Health</option>
                    <option>Productivity</option>
                    <option>Evening</option>
                    <option>Skill Development</option>
                  </select>
                </div>
              </div>

              {/* Reminder Time */}
              <div className="group/field">
                <label className="block text-[13px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1 group-focus-within/field:text-emerald-500 transition-colors">
                  Reminder Time
                </label>
                <div className="input-group group pr-4">
                  <ClockIcon className="input-icon" />
                  <input
                    required
                    type="time"
                    name="time"
                    defaultValue={currentHabit.reminderTime}
                    className="input-field"
                  />
                </div>
              </div>

              {/* Image URL - Span 2 */}
              <div className="md:col-span-2 group/field">
                <label className="block text-[13px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1 group-focus-within/field:text-emerald-500 transition-colors">
                  Feature Image URL
                </label>
                <div className="input-group group">
                  <PhotoIcon className="input-icon" />
                  <input
                    name="image"
                    defaultValue={currentHabit.image}
                    placeholder="Paste a link to an image"
                    className="input-field"
                  />
                </div>
              </div>

              {/* Description - Span 2 */}
              <div className="md:col-span-2 group/field">
                <label className="block text-[13px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1 group-focus-within/field:text-emerald-500 transition-colors">
                  Redefine Your Motivation
                </label>
                <div className="input-group group items-start pt-4">
                  <ChatBubbleBottomCenterTextIcon className="input-icon mt-1" />
                  <textarea
                    required
                    name="description"
                    rows={4}
                    defaultValue={currentHabit.description}
                    placeholder="Why is this habit important to you now?"
                    className="input-field resize-none min-h-[120px]"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-end gap-5">
              <Link 
                to="/my-habits" 
                className="w-full sm:w-auto px-8 py-4 font-bold text-slate-400 hover:text-slate-900 transition-all text-center"
              >
                Discard Changes
              </Link>
              <button 
                type="submit" 
                className="w-full sm:w-auto group relative flex items-center justify-center gap-3 px-12 py-5 bg-emerald-500 text-white rounded-[1.25rem] font-black text-lg shadow-xl shadow-emerald-500/25 hover:bg-emerald-600 hover:shadow-emerald-500/40 transition-all active:scale-[0.98]"
              >
                <PencilSquareIcon className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                Save Transitions
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default UpdateHabit;
