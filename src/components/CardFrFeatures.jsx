import React from "react";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";
import useTheme from "../hooks/useTheme";

const CardFrFeatures = ({ p }) => {
  const { isDark } = useTheme();
  const { _id, description, title, category } = p;
  
  return (
    <div className={`group relative rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border overflow-hidden h-full flex flex-col justify-between ${
      isDark 
        ? 'bg-slate-800 border-slate-700 hover:border-emerald-700' 
        : 'bg-white border-slate-100 hover:border-emerald-100'
    }`}>
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700 ${
        isDark ? 'bg-emerald-900/30' : 'bg-emerald-50'
      }`} />
      
      <div className="relative space-y-4">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold transition-colors duration-300 ${
          isDark 
            ? 'bg-emerald-900/50 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white'
            : 'bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white'
        }`}>
          {category ? category.charAt(0) : (title ? title.charAt(0) : '?')}
        </div>
        
        <div>
          <h3 className={`text-xl font-bold group-hover:text-emerald-600 transition-colors ${
            isDark ? 'text-white' : 'text-slate-800'
          }`}>
            {title}
          </h3>
          <p className="text-sm font-semibold text-emerald-500 uppercase tracking-wider mt-1">
            {category || "Uncategorized"}
          </p>
        </div>
        
        <p className={`line-clamp-3 leading-relaxed text-sm ${
          isDark ? 'text-slate-400' : 'text-slate-500'
        }`}>
          {description}
        </p>
      </div>

      <div className="relative pt-6">
        <Link 
          to={`/habit-details`} 
          state={_id}
          className={`inline-flex items-center gap-2 font-bold hover:text-emerald-600 transition-colors group/btn ${
            isDark ? 'text-slate-300' : 'text-slate-800'
          }`}
        >
          <span>Learn More</span>
          <FaArrowRight className="text-sm group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default CardFrFeatures;