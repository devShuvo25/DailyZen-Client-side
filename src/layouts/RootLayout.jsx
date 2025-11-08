import React from "react";
import { Outlet } from "react-router";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen max-w-[1440px] mx-auto">
      <Navbar />
      <main className="flex-1">
        <Outlet>
          <Home />
        </Outlet>
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
