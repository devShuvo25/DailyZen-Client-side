import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, NavLink, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { GrWheelchairActive } from "react-icons/gr";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogout = () => {
    logout()
      .then(() => {
        Swal.fire({
          title: "Successfully logged out",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="sticky top-0 z-50 px-2 sm:px-4 py-1.5 sm:py-2">
      <div className="navbar glass-effect rounded-xl sm:rounded-2xl shadow-lg px-3 sm:px-4 md:px-6 h-14 sm:h-16 max-w-7xl mx-auto">
        {/* LEFT: Logo + Hamburger */}
        <div className="navbar-start flex items-center gap-2 sm:gap-3">
          <button
            className="lg:hidden p-2 sm:p-2.5 hover:bg-slate-100 rounded-lg transition-all active:scale-95"
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Open menu"
          >
            <FaBars className="text-lg sm:text-xl text-slate-700" />
          </button>

          <Link to="/" className="hidden lg:flex items-center gap-2 group">
            <div className="p-2 bg-emerald-100 rounded-xl group-hover:rotate-12 transition-transform duration-300">
              <GrWheelchairActive className="text-2xl text-[#10B981]" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight">
              <span className="text-slate-800">Daily</span>
              <span className="text-emerald-500">Zone</span>
            </span>
          </Link>

          {user ? (
            <Link to="/" className="lg:hidden flex items-center gap-1.5 sm:gap-2">
              <GrWheelchairActive className="text-xl sm:text-2xl text-[#10B981]" />
              <span className="text-base sm:text-xl font-bold text-slate-800 hidden xs:inline">
                Daily<span className="text-emerald-500">Zone</span>
              </span>
              <span className="text-base font-bold text-emerald-500 xs:hidden">DZ</span>
            </Link>
          ) : (
            <Link to="/" className="lg:hidden flex items-center gap-1.5 sm:gap-2">
              <GrWheelchairActive className="text-xl sm:text-2xl text-[#10B981]" />
              <span className="text-base sm:text-xl font-bold text-slate-800 hidden xs:inline">
                Daily<span className="text-emerald-500">Zone</span>
              </span>
              <span className="text-base font-bold text-emerald-500 xs:hidden">DZ</span>
            </Link>
          )}
        </div>

        {/* CENTER: Desktop NavLinks */}
        <div className="navbar-center hidden lg:flex gap-1 items-center bg-slate-50/50 p-1.5 rounded-2xl border border-slate-100">
          {[
            { path: "/", name: "Home" },
            { path: "/add-habit", name: "Add Habit" },
            { path: "/my-habits", name: "My Habits" },
            { path: "/public-habits", name: "Public Habits" },
            { path: "/contact", name: "Contact" },
          ].map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              className={({ isActive }) =>
                `relative px-4 xl:px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                  isActive
                    ? "text-white scale-105"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/50"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="relative z-10">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-xl shadow-emerald-500/30"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* RIGHT: User or Auth Buttons */}
        <div className="navbar-end gap-2 sm:gap-3">
          {user ? (
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              <button onClick={handleLogout} className="my-btn hidden md:block text-sm lg:text-base px-4 lg:px-6">
                Logout
              </button>
              <Link 
                to="/profile"
                data-tooltip-id="user-tooltip"
                data-tooltip-content={user?.displayName}
                className="relative group cursor-pointer"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl border-2 border-emerald-500 p-0.5 overflow-hidden ring-2 sm:ring-4 ring-emerald-50 group-hover:scale-110 transition-transform duration-300">
                  <img
                    className="w-full h-full object-cover rounded-[5px] sm:rounded-[7px]"
                    src={user?.photoURL || "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"}
                    alt="User"
                  />
                </div>
              </Link>
              <Tooltip id="user-tooltip" place="bottom" />
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link to="/login" className="px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 text-sm sm:text-base text-slate-600 font-semibold hover:text-slate-900 transition-colors">
                Login
              </Link>
              <Link to="/register" className="my-btn text-sm sm:text-base px-4 sm:px-5 lg:px-6">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* ✅ Mobile Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
            />

            <motion.div
              className="fixed top-0 left-0 h-full w-[85%] sm:w-[75%] max-w-[340px] bg-white shadow-2xl z-50 flex flex-col p-5 sm:p-6 md:p-8"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex justify-between items-center mb-8 sm:mb-10">
                <Link to="/" className="flex items-center gap-2" onClick={() => setIsDrawerOpen(false)}>
                  <GrWheelchairActive className="text-2xl sm:text-3xl text-[#10B981]" />
                  <span className="text-xl sm:text-2xl font-extrabold text-slate-800">
                    Daily<span className="text-emerald-500">Zone</span>
                  </span>
                </Link>
                <button
                  className="p-2.5 hover:bg-slate-100 rounded-lg transition-all active:scale-95"
                  onClick={() => setIsDrawerOpen(false)}
                  aria-label="Close menu"
                >
                  <FaTimes className="text-lg sm:text-xl text-slate-400" />
                </button>
              </div>

              <div className="flex flex-col gap-2 sm:gap-3 overflow-y-auto flex-1">
                {[
                  { path: "/", name: "Home" },
                  { path: "/add-habit", name: "Add Habit" },
                  { path: "/my-habits", name: "My Habits" },
                  { path: "/public-habits", name: "Public Habits" },
                  { path: "/contact", name: "Contact" },
                ].map((item, i) => (
                  <NavLink
                    key={i}
                    to={item.path}
                    onClick={() => setIsDrawerOpen(false)}
                    className={({ isActive }) =>
                      `group relative flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg font-black transition-all active:scale-[0.98] ${
                        isActive
                          ? "bg-gradient-to-r from-emerald-50 to-emerald-100/50 text-emerald-600 pl-7 sm:pl-8 shadow-lg shadow-emerald-500/10"
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="relative z-10">{item.name}</span>
                        {isActive && (
                          <motion.div 
                            layoutId="mobile-nav-indicator"
                            className="absolute left-0 w-2 h-7 sm:h-8 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-r-full shadow-lg shadow-emerald-500/50" 
                          />
                        )}
                        <span className={`opacity-0 group-hover:opacity-100 transition-opacity text-lg sm:text-xl ${isActive ? 'text-emerald-400' : 'text-slate-200'}`}>
                          →
                        </span>
                      </>
                    )}
                  </NavLink>
                ))}
              </div>

              <div className="mt-auto pt-4 space-y-2.5 sm:space-y-3 border-t border-slate-100">
                {user ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsDrawerOpen(false);
                    }}
                    className="w-full my-btn text-sm sm:text-base py-3 sm:py-3.5"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="w-full my-btn-2 block text-center text-sm sm:text-base py-3 sm:py-3.5"
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="w-full my-btn block text-center text-sm sm:text-base py-3 sm:py-3.5"
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
