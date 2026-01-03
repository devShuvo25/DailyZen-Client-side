import React from "react";
import { Outlet } from "react-router";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <div className="flex flex-col bg-[#F8FAFC] min-h-screen max-w-7xl mx-auto shadow-2xl shadow-slate-200">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default RootLayout;
