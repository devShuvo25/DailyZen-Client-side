import React, { useEffect, useRef } from 'react';
import { LuClockAlert, LuSkull, LuZapOff } from 'react-icons/lu';
import { FaExclamationTriangle } from "react-icons/fa";
import gsap from 'gsap';
import { motion } from "framer-motion";

import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BadHabits = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
        // Entrance animation for content
        gsap.from(contentRef.current, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });

        // Entrance animation for visual side
        gsap.from(visualRef.current, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            x: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.2
        });

        // Floating glitch effect for background icon
        gsap.to(".warning-icon", {
            y: 10,
            repeat: -1,
            yoyo: true,
            duration: 2,
            ease: "sine.inOut"
        });
    });
    return () => ctx.revert();
  }, []);

  const patterns = [
    {
      title: "The Procrastination Trap",
      desc: "Delaying high-impact work creates a debt of stress that compounds daily. Breaking it requires immediate, small-scale action.",
      icon: <LuClockAlert className="text-rose-500" size={28} />,
      stat: "40% Loss in Productivity"
    },
    {
      title: "The Inconsistency Void",
      desc: "Sporadic effort resets your neural adaptation cycles. Habits only stick when the chain remains unbroken.",
      icon: <LuZapOff className="text-amber-500" size={28} />,
      stat: "Reset Neural Progress"
    },
    {
      title: "Environmental Friction",
      desc: "Negative surroundings act as physical barriers to progress. Your environment is the silent architect of your behavior.",
      icon: <LuSkull className="text-slate-400" size={28} />,
      stat: "Silent Progress Killer"
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-56 bg-slate-900 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1510519133411-0677aedf78d2?q=80&w=2000')] bg-cover bg-fixed bg-center opacity-5 mix-blend-overlay" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-rose-900/10 rounded-full -mr-96 -mt-96 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-900/10 rounded-full -ml-80 -mb-80 blur-[100px]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:items-center">
          
          {/* Content Side */}
          <div ref={contentRef} className="space-y-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-rose-500/10 rounded-full border border-rose-500/20 text-rose-500 font-black text-xs tracking-[0.2em] uppercase">
                 <FaExclamationTriangle className="animate-pulse" /> Critical Alert
              </div>
              <h2 className="text-5xl lg:text-7xl font-black text-white leading-[1.1]">
                Break the <br /><span className="text-rose-500 underline decoration-rose-500/30 underline-offset-[12px]">Cycle.</span>
              </h2>
              <p className="text-slate-400 text-xl font-medium max-w-xl leading-relaxed">
                Sustainable growth isn't just about building new routines—it's about the deliberate dismantling of the patterns that hold you captive.
              </p>
            </div>

            <div className="space-y-6">
              {patterns.map((pattern, i) => (
                <div key={i} className="group relative flex gap-8 p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2.5rem] hover:bg-white/10 transition-all duration-500 hover:border-rose-500/30">
                  <div className="w-14 h-14 shrink-0 bg-slate-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    {pattern.icon}
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <h3 className="text-xl font-black text-white">{pattern.title}</h3>
                        <span className="text-[10px] font-black tracking-widest uppercase px-3 py-1 bg-rose-500/20 text-rose-400 rounded-full border border-rose-500/10">{pattern.stat}</span>
                    </div>
                    <p className="text-slate-400 font-medium leading-relaxed text-sm lg:text-base">{pattern.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Side */}
          <div ref={visualRef} className="relative hidden lg:flex justify-center items-center">
             <div className="w-[500px] h-[600px] border border-slate-700/50 rounded-[5rem] relative overflow-hidden group">
                <img 
                    src="https://images.unsplash.com/photo-1493839523149-2864fca44919?q=80&w=1200" 
                    className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                    alt="Atmospheric concept"
                />
                <div className="absolute inset-0 bg-slate-950/60" />
                
                {/* Immersive Overlay */}
                <div className="absolute inset-0 p-12 flex flex-col justify-end">
                    <div className="space-y-4">
                        <div className="warning-icon w-16 h-16 bg-rose-500/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-rose-500/30">
                            <FaExclamationTriangle className="text-rose-500 text-3xl" />
                        </div>
                        <h4 className="text-3xl font-black text-white">The Cost of <br />Inaction.</h4>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: "85%" }}
                                transition={{ duration: 2, ease: "circOut" }}
                                className="h-full bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)]" 
                            />
                        </div>
                        <p className="text-slate-400 text-xs font-black tracking-widest uppercase">Statistical Impact on Goal Attainment</p>
                    </div>
                </div>
             </div>

             {/* Floating Badge */}
             <div className="absolute -bottom-10 -right-4 bg-white p-8 rounded-[2.5rem] shadow-2xl max-w-[240px] border border-slate-100 rotate-6 group-hover:rotate-0 transition-all duration-500">
                <p className="text-slate-400 text-[10px] font-black tracking-widest uppercase mb-2">Escaping the loop</p>
                <p className="text-slate-900 font-black text-lg">"Habit is the intersection of knowledge, skill, and desire."</p>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BadHabits;