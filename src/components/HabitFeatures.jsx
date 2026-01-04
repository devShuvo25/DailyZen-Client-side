import React, { useEffect, useState, useRef } from 'react';
import CardFrFeatures from './CardFrFeatures';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Spinners from './Spinners';
import { 
  SparklesIcon, 
  ArrowTrendingUpIcon, 
  ShieldCheckIcon, 
  BeakerIcon 
} from "@heroicons/react/24/outline";

gsap.registerPlugin(ScrollTrigger);

const HabitsFeatures = ({children}) => {
    const [habits,setHabits] = useState([]);
    const {instance} = useAxiosSecure();
    const [isLoading,setIsLoading] = useState(true);
    const containerRef = useRef(null);
    const whySectionRef = useRef(null);
    const coreRef = useRef(null);

    useEffect(() => {
        instance.get('/latest-fatures')
        .then(result => {
            setHabits(result.data);
            setIsLoading(false);
        })
    },[instance]);

    useEffect(() => {
        if (isLoading || habits.length === 0) return;

        const ctx = gsap.context(() => {
            gsap.from(".feature-card", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out"
            });
        }, containerRef);

        return () => ctx.revert();
    }, [isLoading, habits]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animation for bubbles
            gsap.to(".benefit-bubble", {
                y: "random(-20, 20)",
                x: "random(-10, 10)",
                duration: "random(2, 4)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            // Entrance for the whole section
            gsap.from(".why-header", {
                scrollTrigger: {
                    trigger: whySectionRef.current,
                    start: "top 70%",
                },
                y: 40,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
        });
        return () => ctx.revert();
    }, []);

    const benefits = [
        { 
            icon: <ArrowTrendingUpIcon className="w-8 h-8" />, 
            title: "Massive Growth", 
            desc: "Small 1% daily improvements compound into life-changing transformation over time.",
            color: "emerald" 
        },
        { 
            icon: <ShieldCheckIcon className="w-8 h-8" />, 
            title: "Neural Rewiring", 
            desc: "Consistent repetition strengthens neural pathways, making success your default mode.",
            color: "indigo" 
        },
        { 
            icon: <BeakerIcon className="w-8 h-8" />, 
            title: "Mental Clarity", 
            desc: "Routines automate trivial choices, preserving your willpower for high-impact decisions.",
            color: "amber" 
        },
        { 
            icon: <SparklesIcon className="w-8 h-8" />, 
            title: "Peak Performance", 
            desc: "Optimized habits align your energy with your highest goals for maximum output.",
            color: "rose" 
        }
    ];

    return (
        <div className='max-w-7xl mx-auto px-6 py-20 overflow-hidden'>
            {/* Features Section */}
            <div className='text-center space-y-4 mb-20'>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full font-bold text-xs tracking-widest uppercase border border-emerald-100 mb-2">
                   <SparklesIcon className="w-4 h-4" /> Latest Capabilities
                </div>
                <h1 className='text-4xl lg:text-7xl font-black text-slate-900 leading-tight'>
                    Elevate Your <span className='text-emerald-500'>Routine.</span>
                </h1>
                <p className='text-slate-500 text-lg lg:text-xl max-w-2xl mx-auto font-medium'>
                    Precision tools designed for individuals who refuse to settle for mediocrity.
                </p>
            </div>

            {isLoading ? <Spinners /> : (
                <div ref={containerRef} className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-40'>
                    {habits.map((p, idx) => (
                        <div key={idx} className="feature-card">
                            <CardFrFeatures p={p} />
                        </div>
                    ))}
                    {children}
                </div>
            )}

            {/* Why Habits Section - High Impact Redesign */}
            <div ref={whySectionRef} className="relative pt-20">
                <div className='why-header text-center space-y-6 mb-24 relative z-10'>
                    <h2 className='text-amber-500 font-black tracking-[0.3em] uppercase text-sm'>Evolution Strategy</h2>
                    <h1 className='text-4xl lg:text-7xl font-black text-slate-900'>
                        Why Choose <span className='text-[#10B981]'>Discipline?</span>
                    </h1>
                    <p className="text-slate-400 font-bold max-w-md mx-auto italic">"We are what we repeatedly do. Excellence, then, is not an act, but a habit." — Aristotle</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Visual Core - Redesigned */}
                    <div ref={coreRef} className="relative h-[400px] lg:h-[600px] flex items-center justify-center order-2 lg:order-1">
                        {/* Gradient Background Orbs */}
                        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-emerald-200/40 to-teal-300/40 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-indigo-200/40 to-purple-300/40 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
                        
                        {/* Main Container */}
                        <div className="relative w-full max-w-md px-4">
                            {/* Hero Stat Card */}
                            <div className="relative bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 rounded-[3rem] p-8 shadow-2xl shadow-emerald-500/30 mb-6 overflow-hidden group hover:scale-105 transition-transform duration-500">
                                {/* Decorative Elements */}
                                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                                
                                <div className="relative z-10">
                                    <div className="flex items-baseline gap-2 mb-2">
                                        <span className="text-7xl font-black text-white">99</span>
                                        <span className="text-4xl font-black text-white/80">%</span>
                                    </div>
                                    <p className="text-emerald-50 font-bold text-sm tracking-wider uppercase">Success Rate</p>
                                    <div className="mt-4 pt-4 border-t border-white/20">
                                        <p className="text-white/90 text-xs font-medium">Users who build consistent habits achieve their goals</p>
                                    </div>
                                </div>
                            </div>

                            {/* Metric Cards Stack */}
                            <div className="space-y-4">
                                {/* Card 1 */}
                                <div className="benefit-bubble bg-white rounded-[2rem] p-6 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-300 hover:-translate-y-1">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                                            <ArrowTrendingUpIcon className="w-7 h-7 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-2xl font-black text-slate-900">+127%</p>
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Productivity Boost</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Card 2 */}
                                <div className="benefit-bubble bg-white rounded-[2rem] p-6 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 hover:-translate-y-1" style={{animationDelay: '0.2s'}}>
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                                            <ShieldCheckIcon className="w-7 h-7 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-2xl font-black text-slate-900">21 Days</p>
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">To Form a Habit</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Card 3 */}
                                <div className="benefit-bubble bg-white rounded-[2rem] p-6 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:shadow-amber-100/50 transition-all duration-300 hover:-translate-y-1" style={{animationDelay: '0.4s'}}>
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/30">
                                            <BeakerIcon className="w-7 h-7 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-2xl font-black text-slate-900">10,000+</p>
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Lives Transformed</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content List */}
                    <div className="space-y-6 order-1 lg:order-2">
                        {benefits.map((benefit, i) => (
                            <div 
                                key={i} 
                                className="group flex gap-8 p-8 bg-white hover:bg-slate-50 border border-slate-100 rounded-[2.5rem] transition-all duration-500 hover:shadow-xl hover:shadow-slate-200/50"
                            >
                                <div className={`w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center bg-${benefit.color}-50 text-${benefit.color}-600 group-hover:scale-110 transition-transform`}>
                                    {benefit.icon}
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{benefit.title}</h3>
                                    <p className="text-slate-500 font-medium leading-relaxed">{benefit.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HabitsFeatures;
