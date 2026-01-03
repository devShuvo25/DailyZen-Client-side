import React from "react";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";

const CardFrFeatures = ({ p }) => {
  const { _id, description, title, category } = p;
  
  return (
    <div className="group relative bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 hover:border-emerald-100 overflow-hidden h-full flex flex-col justify-between">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
      
      <div className="relative space-y-4">
        <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 text-2xl font-bold group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
          {category ? category.charAt(0) : (title ? title.charAt(0) : '?')}
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
            {title}
          </h3>
          <p className="text-sm font-semibold text-emerald-500 uppercase tracking-wider mt-1">
            {category || "Uncategorized"}
          </p>
        </div>
        
        <p className="text-slate-500 line-clamp-3 leading-relaxed text-sm">
          {description}
        </p>
      </div>

      <div className="relative pt-6">
        <Link 
          to={`/habit-details`} 
          state={_id}
          className="inline-flex items-center gap-2 font-bold text-slate-800 hover:text-emerald-600 transition-colors group/btn"
        >
          <span>Learn More</span>
          <FaArrowRight className="text-sm group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default CardFrFeatures;