import React from "react";
import { motion } from "framer-motion";
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon, 
  PaperAirplaneIcon,
  GlobeAltIcon
} from "@heroicons/react/24/outline";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import useTheme from "../hooks/useTheme";

const Contact = () => {
  const { isDark } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for form submission
  };

  return (
    <div className={`min-h-screen pb-20 pt-32 px-6 transition-colors duration-300 ${
      isDark ? 'bg-slate-950' : 'bg-[#F8FAFC]'
    }`}>
      <title>DailyZone - Contact Us</title>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20 space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border font-bold text-sm tracking-widest uppercase transition-colors duration-300 ${
              isDark 
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600'
            }`}
          >
            <GlobeAltIcon className="w-4 h-4" /> Get in Touch
          </motion.div>
          <h1 className={`text-4xl lg:text-7xl font-black transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Let's Start Your <span className="text-emerald-500">Transformation.</span>
          </h1>
          <p className={`text-lg lg:text-xl max-w-2xl mx-auto font-medium transition-colors duration-300 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Have questions about your habit tracking journey? Our team is here to support your growth every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div className="space-y-8">
              {[
                { 
                  icon: <EnvelopeIcon className="w-7 h-7" />, 
                  label: "Email Support", 
                  value: "support@dailyzone.com", 
                  desc: "We typically respond within 24 hours.",
                  color: isDark ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-50 text-emerald-600" 
                },
                { 
                  icon: <PhoneIcon className="w-7 h-7" />, 
                  label: "Voice Support", 
                  value: "+1 (555) 000-0000", 
                  desc: "Mon-Fri from 9am to 6pm EST.",
                  color: isDark ? "bg-indigo-500/10 text-indigo-400" : "bg-indigo-50 text-indigo-600" 
                },
                { 
                  icon: <MapPinIcon className="w-7 h-7" />, 
                  label: "Headquarters", 
                  value: "San Francisco, CA", 
                  desc: "The heart of productivity and innovation.",
                  color: isDark ? "bg-amber-500/10 text-amber-400" : "bg-amber-50 text-amber-600" 
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className={`w-16 h-16 shrink-0 rounded-[1.5rem] flex items-center justify-center shadow-sm group-hover:scale-110 transition-all ${item.color}`}>
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <p className={`text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${
                      isDark ? 'text-slate-500' : 'text-slate-400'
                    }`}>{item.label}</p>
                    <p className={`text-xl font-bold transition-colors duration-300 ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>{item.value}</p>
                    <p className={`font-medium transition-colors duration-300 ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={`pt-12 border-t transition-colors duration-300 ${
              isDark ? 'border-slate-800' : 'border-slate-200'
            }`}>
              <p className={`text-sm font-bold uppercase tracking-widest mb-6 transition-colors duration-300 ${
                isDark ? 'text-slate-500' : 'text-slate-400'
              }`}>Follow our growth</p>
              <div className="flex gap-4">
                {[FaFacebook, FaTwitter, FaLinkedin, FaInstagram].map((Icon, i) => (
                  <button key={i} className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all shadow-sm hover:scale-110 ${
                    isDark 
                      ? 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-emerald-600 hover:text-white hover:border-emerald-600' 
                      : 'bg-white border-slate-100 text-slate-400 hover:bg-emerald-500 hover:text-white hover:border-emerald-500'
                  }`}>
                    <Icon size={20} />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className={`rounded-[3rem] p-8 lg:p-12 shadow-2xl border transition-colors duration-300 ${
              isDark 
                ? 'bg-slate-800 shadow-slate-900/50 border-slate-700' 
                : 'bg-white shadow-slate-900/5 border-slate-100'
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={`text-sm font-bold ml-1 transition-colors duration-300 ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>Full Name</label>
                  <input required placeholder="Elon Musk" className="my-input" />
                </div>
                <div className="space-y-2">
                  <label className={`text-sm font-bold ml-1 transition-colors duration-300 ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>Email Address</label>
                  <input required type="email" placeholder="elon@dailyzone.com" className="my-input" />
                </div>
              </div>

              <div className="space-y-2">
                <label className={`text-sm font-bold ml-1 transition-colors duration-300 ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>Subject</label>
                <select className="my-input appearance-none font-bold cursor-pointer">
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Collaboration</option>
                  <option>Feedback</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className={`text-sm font-bold ml-1 transition-colors duration-300 ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>How can we help?</label>
                <textarea required rows={5} placeholder="Tell us more about your quest for consistency..." className="my-input resize-none" />
              </div>

              <button type="submit" className="w-full my-btn py-5 text-lg font-black tracking-widest shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3 group">
                SEND MESSAGE <PaperAirplaneIcon className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>

    </div>
  );
};

export default Contact;