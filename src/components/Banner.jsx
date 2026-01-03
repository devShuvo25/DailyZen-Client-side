import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import image from "../assets/The Science and Benefits of Habit Formation.jpg"
import { SparklesIcon, RocketLaunchIcon, ChartBarIcon } from "@heroicons/react/24/outline";

const FullWidthSlider = () => {
  const cards = [
    {
      title: 'Build Better Habits',
      subtitle: 'One Day at a Time',
      description: 'Track your daily routines, boost productivity, and grow with consistent habits.',
      image: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=2000&auto=format&fit=crop",
      icon: SparklesIcon
    },
    {
      title: 'Stay Consistent',
      subtitle: 'Stay Ahead',
      description: 'Track your habits, build streaks, and boost your productivity.',
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2000&auto=format&fit=crop",
      icon: RocketLaunchIcon
    },
    {
      title: 'Your Journey to Growth',
      subtitle: 'Starts Here',
      description: 'Set your goals, track progress, and transform your routine.',
      image: image,
      icon: ChartBarIcon
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [cards.length]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [titleRef.current, subtitleRef.current],
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power4.out" }
      );
      
      gsap.fromTo(
        ".banner-image",
        { scale: 1.15 },
        { scale: 1, duration: 2.5, ease: "power2.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [currentIndex]);

  const CurrentIcon = cards[currentIndex].icon;

  return (
    <div className="px-2 sm:px-4 py-3 sm:py-4" ref={containerRef}>
      <div className="relative w-full h-[500px] sm:h-[550px] md:h-[600px] lg:h-[650px] xl:h-[700px] overflow-hidden rounded-2xl sm:rounded-[2rem] lg:rounded-[3rem] shadow-2xl bg-slate-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={cards[currentIndex].image}
              className="banner-image w-full h-full object-cover"
              alt="Slide"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-slate-900/60 to-emerald-900/40" />
            
            {/* Floating Elements */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 left-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 lg:px-12">
              <div className="max-w-5xl w-full space-y-4 sm:space-y-6 md:space-y-8">
                {/* Icon Badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center justify-center"
                >
                  <div className="p-3 sm:p-4 bg-emerald-500/10 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-emerald-500/20 shadow-xl">
                    <CurrentIcon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-emerald-400" />
                  </div>
                </motion.div>

                {/* Title */}
                <div className="space-y-2 sm:space-y-3">
                  <h1 
                    ref={titleRef}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight tracking-tight"
                  >
                    {cards[currentIndex].title}
                  </h1>
                  <h2 
                    ref={subtitleRef}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-emerald-400 leading-tight tracking-tight"
                  >
                    {cards[currentIndex].subtitle}
                  </h2>
                </div>

                {/* Description */}
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-slate-200 font-medium max-w-3xl mx-auto leading-relaxed px-2 sm:px-4"
                >
                  {cards[currentIndex].description}
                </motion.p>

                {/* Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-4 md:pt-6 px-4 sm:px-0"
                >
                  <button className="w-full sm:w-auto my-btn text-sm sm:text-base md:text-lg lg:text-xl py-3 sm:py-3.5 md:py-4 lg:py-5 px-6 sm:px-8 md:px-10 lg:px-12 shadow-2xl shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all hover:-translate-y-1 active:scale-95">
                    Get Started Free
                  </button>
                  <button className="w-full sm:w-auto my-btn-2 bg-white/10 border-2 border-white/30 text-white backdrop-blur-md hover:bg-white/20 hover:border-white/50 text-sm sm:text-base md:text-lg lg:text-xl py-3 sm:py-3.5 md:py-4 lg:py-5 px-6 sm:px-8 md:px-10 lg:px-12 transition-all hover:-translate-y-1 active:scale-95">
                    View Features
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Indicators */}
        <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-10">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ${
                currentIndex === i ? "w-8 sm:w-10 md:w-12 bg-emerald-500 shadow-lg shadow-emerald-500/50" : "w-1.5 sm:w-2 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FullWidthSlider;
