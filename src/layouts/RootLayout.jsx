import React from "react";
import { Outlet } from "react-router";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useTheme from "../hooks/useTheme";

const RootLayout = () => {
  const { isDark } = useTheme();
  
  return (
    <div className={`flex flex-col min-h-screen max-w-7xl mx-auto shadow-2xl transition-colors duration-300 ${isDark ? 'bg-slate-950 shadow-black' : 'bg-[#F8FAFC] shadow-slate-200'}`}>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default RootLayout;
