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
                    {/* Visual Core */}
                    <div ref={coreRef} className="relative h-[400px] lg:h-[600px] flex items-center justify-center order-2 lg:order-1">
                        <div className="absolute inset-0 bg-slate-50 rounded-[4rem] -rotate-3 border border-slate-100" />
                        
                        {/* Central Hub */}
                        <div className="w-40 h-40 bg-white rounded-[2.5rem] shadow-2xl shadow-emerald-500/20 flex items-center justify-center z-10 border border-emerald-50 relative animate-pulse">
                            <div className="text-6xl font-black text-emerald-500">99%</div>
                            <div className="absolute -bottom-4 bg-emerald-500 text-white px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase shadow-lg">Success Rate</div>
                        </div>

                        {/* Orbiting Elements */}
                        <div className="absolute top-10 left-10 benefit-bubble bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100 shadow-sm flex items-center gap-4 max-w-[240px]">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-500 shadow-sm"><ArrowTrendingUpIcon className="w-6 h-6" /></div>
                            <p className="text-xs font-bold text-slate-700">Compounding Progress</p>
                        </div>
                        <div className="absolute bottom-20 right-10 benefit-bubble bg-indigo-50 p-6 rounded-[2rem] border border-indigo-100 shadow-sm flex items-center gap-4 max-w-[240px]">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-indigo-500 shadow-sm"><ShieldCheckIcon className="w-6 h-6" /></div>
                            <p className="text-xs font-bold text-slate-700">Neural Efficiency</p>
                        </div>
                         <div className="absolute top-1/2 -right-4 benefit-bubble bg-amber-50 p-6 rounded-[2rem] border border-amber-100 shadow-sm flex items-center gap-4 max-w-[240px]">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-amber-500 shadow-sm"><BeakerIcon className="w-6 h-6" /></div>
                            <p className="text-xs font-bold text-slate-700">Cognitive Freedom</p>
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
