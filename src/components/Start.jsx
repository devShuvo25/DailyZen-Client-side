import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaRocket, FaPaperPlane } from "react-icons/fa";
import { BeakerIcon, SparklesIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useTheme from "../hooks/useTheme";

gsap.registerPlugin(ScrollTrigger);

const StartJourney = () => {
  const { isDark } = useTheme();
  const containerRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main container entrance
      gsap.from(".cta-container", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        scale: 0.95,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
      });

      // Text stagger
      gsap.from(".cta-text > *", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      });

      // Floating particles effect
      gsap.to(".particle", {
        y: "random(-100, 100)",
        x: "random(-50, 50)",
        duration: "random(4, 8)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={`relative py-32 lg:py-56 overflow-hidden transition-colors duration-300 ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 particle w-4 h-4 bg-emerald-500/10 rounded-full blur-sm" />
      <div className="absolute bottom-1/4 right-20 particle w-6 h-6 bg-indigo-500/10 rounded-full blur-md" />
      <div className="absolute top-1/2 left-1/2 particle w-3 h-3 bg-amber-500/10 rounded-full" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="cta-container relative bg-slate-900 rounded-[4rem] p-8 lg:p-24 overflow-hidden border border-slate-800 shadow-[0_40px_100px_-20px_rgba(15,23,42,0.3)]">
          {/* Immersive Background */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000')] bg-cover bg-center opacity-10 mix-blend-screen" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px]" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px]" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* Left Content */}
            <div className="cta-text space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20 text-emerald-400 font-black text-xs tracking-widest uppercase">
                 <SparklesIcon className="w-4 h-4" /> Final Step to Mastery
              </div>
              <h2 className="text-5xl lg:text-8xl font-black text-white leading-[1.05]">
                Rewrite Your <br />
                <span className="text-emerald-400 italic">Destiny.</span>
              </h2>
              <p className="text-slate-400 text-xl font-medium max-w-xl leading-relaxed">
                Precision-engineered habit tracking for the ambitious. Join the top 1% who prioritize consistency over intensity.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-6 pt-6">
                <Link 
                  to={'/add-habit'} 
                  className="group w-full sm:w-auto px-10 py-5 bg-emerald-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3 transition-all hover:bg-emerald-400 hover:scale-105 active:scale-95"
                >
                  <FaRocket className="text-sm group-hover:rotate-12 transition-transform" /> 
                  Begin Your Evolution
                </Link>
                <Link 
                  to={'/public-habits'} 
                  className="w-full sm:w-auto px-10 py-5 bg-white/5 backdrop-blur-md text-white rounded-2xl font-black text-lg border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                >
                  View Library
                </Link>
              </div>
            </div>

            {/* Newsletter Portal */}
            <div ref={formRef} className="relative">
              <div className="p-1 rounded-[3rem] bg-slate-800">
                <div className="bg-slate-900/80 backdrop-blur-3xl border border-white/5 p-10 lg:p-14 rounded-[2.8rem] space-y-10 relative overflow-hidden">
                  
                  {/* Internal Graphics */}
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <BeakerIcon className="w-32 h-32 text-emerald-500" />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-emerald-500 font-black text-[10px] tracking-widest uppercase">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        Scientific Update
                    </div>
                    <h3 className="text-3xl font-black text-white">The Consistency Engine™</h3>
                    <p className="text-slate-400 font-medium">Get neuroscience-backed habit protocols delivered to your inbox every Monday.</p>
                  </div>

                  <form className="space-y-4">
                    <div className="relative group">
                      <input 
                        type="email" 
                        placeholder="your@excellence.com"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white placeholder:text-slate-600 focus:bg-white/10 focus:border-emerald-500/50 focus:outline-none transition-all font-bold text-lg"
                      />
                    </div>
                    <button className="w-full py-5 bg-white text-slate-950 rounded-2xl font-black tracking-[0.2em] hover:bg-emerald-50 transition-all active:scale-[0.98] flex items-center justify-center gap-3 text-sm shadow-xl shadow-white/5">
                      <FaPaperPlane className="text-xs" /> JOIN THE LAB
                    </button>
                    <p className="text-center text-[10px] text-slate-500 font-black uppercase tracking-widest pt-2">
                        Zero spam. Total performance.
                    </p>
                  </form>

                  {/* Micro-stat */}
                  <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                    <div className="flex -space-x-3">
                        {[1,2,3,4].map(i => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center font-black text-[10px] text-white">
                                {String.fromCharCode(64 + i)}
                            </div>
                        ))}
                        <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-emerald-500 flex items-center justify-center font-black text-[10px] text-white">
                            +10k
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-white font-black text-sm">Join the Elite</span>
                        <span className="text-slate-500 text-[10px] font-bold">128 New Subs Today</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default StartJourney;
