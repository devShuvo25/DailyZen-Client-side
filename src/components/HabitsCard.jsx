import React from "react";
import { Link } from "react-router";
import { CalendarIcon, UserIcon } from "@heroicons/react/24/outline";
import useTheme from "../hooks/useTheme";

const HabitsCard = ({ habit }) => {
  const { isDark } = useTheme();
  const { _id, title, category, image, created_at, user_name } = habit;
  
  return (
    <div className={`group relative rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border h-full flex flex-col ${
      isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'
    }`}>
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image || "https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=800&auto=format&fit=crop"} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          alt={title}
        />
        <div className="absolute inset-0 bg-slate-900/40 opacity-60 group-hover:opacity-80 transition-opacity" />
        <div className="absolute bottom-4 left-6">
          <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full uppercase tracking-widest">
            {category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 flex flex-col flex-grow space-y-4">
        <h3 className={`text-2xl font-bold line-clamp-1 group-hover:text-emerald-600 transition-colors ${
          isDark ? 'text-white' : 'text-slate-800'
        }`}>
          {title}
        </h3>
        
        <div className={`flex items-center justify-between text-sm font-medium ${
          isDark ? 'text-slate-400' : 'text-slate-500'
        }`}>
          <div className="flex items-center gap-2">
            <UserIcon className="w-4 h-4 text-emerald-500" />
            <span>{user_name || "DailyZone User"}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-amber-500" />
            <span>{created_at ? created_at.split(",")[0] : "Recent"}</span>
          </div>
        </div>

        <div className="pt-4 mt-auto">
          <Link 
            to={"/habit-details"} 
            state={_id} 
            className="w-full my-btn flex items-center justify-center gap-2"
          >
            Explore Habit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HabitsCard;
