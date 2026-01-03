import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

const FullWidthSlider = () => {
  const cards = [
    {
      title: 'Build Better Habits, One Day at a Time',
      subtitle: 'Track your daily routines, boost productivity, and grow with consistent habits.',
      image: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=2000&auto=format&fit=crop"
    },
    {
      title: 'Stay Consistent, Stay Ahead',
      subtitle: 'Track your habits, build streaks, and boost your productivity.',
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2000&auto=format&fit=crop"
    },
    {
      title: 'Your Journey to Growth Starts Here',
      subtitle: 'Set your goals, track progress, and transform your routine.',
      image: "https://images.unsplash.com/photo-1506784917817-742220970716?q=80&w=2000&auto=format&fit=crop"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [cards.length]);

  useEffect(() => {
    // GSAP Animation for slide entrance
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [titleRef.current, subtitleRef.current],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power4.out" }
      );
      
      gsap.fromTo(
        ".banner-image",
        { scale: 1.1 },
        { scale: 1, duration: 2, ease: "power2.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [currentIndex]);

  return (
    <div className="px-4 py-4" ref={containerRef}>
      <div className="relative w-full h-[400px] lg:h-[600px] overflow-hidden rounded-[2rem] shadow-2xl bg-slate-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={cards[currentIndex].image}
              className="banner-image w-full h-full object-cover"
              alt="Slide"
            />
            <div className="absolute inset-0 bg-slate-900/60" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <div className="max-w-4xl space-y-6">
                <h1 
                  ref={titleRef}
                  className="text-4xl lg:text-7xl font-extrabold text-white leading-tight"
                >
                  {cards[currentIndex].title.split(',').map((part, i) => (
                    <span key={part} className={i === 1 ? "text-emerald-500 block" : "block"}>
                      {part}{i === 0 ? ',' : ''}
                    </span>
                  ))}
                </h1>
                <p 
                  ref={subtitleRef}
                  className="text-lg lg:text-2xl text-slate-200 font-medium max-w-2xl mx-auto"
                >
                  {cards[currentIndex].subtitle}
                </p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex gap-4 justify-center pt-4"
                >
                  <button className="my-btn text-lg py-4 px-10">
                    Get Started Free
                  </button>
                  <button className="my-btn-2 bg-white/10 border-white/20 text-white backdrop-blur-md hover:bg-white/20 text-lg py-4 px-10">
                    View Features
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all duration-500 ${
                currentIndex === i ? "w-12 bg-[#10B981]" : "w-2 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FullWidthSlider;
