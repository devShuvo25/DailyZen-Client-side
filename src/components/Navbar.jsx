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
    <div className="sticky top-0 z-50 px-4 py-2">
      <div className="navbar glass-effect rounded-2xl shadow-lg px-6 h-16 max-w-7xl mx-auto">
        {/* LEFT: Logo + Hamburger */}
        <div className="navbar-start flex items-center gap-3">
          <button
            className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setIsDrawerOpen(true)}
          >
            <FaBars className="text-xl text-slate-700" />
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
            <Link to="/" className="lg:hidden flex items-center gap-2">
              <GrWheelchairActive className="text-2xl text-[#10B981]" />
              <span className="text-xl font-bold text-slate-800">Daily<span className="text-emerald-500">Zone</span></span>
            </Link>
          ) : (
            <Link to="/" className="lg:hidden flex items-center gap-1">
              <GrWheelchairActive className="text-2xl text-[#10B981]" />
              <span className="text-xl font-bold text-emerald-500">DZ</span>
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
                `relative px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                  isActive
                    ? "text-white"
                    : "text-slate-500 hover:text-slate-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="relative z-10">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 bg-emerald-500 rounded-xl shadow-lg shadow-emerald-500/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* RIGHT: User or Auth Buttons */}
        <div className="navbar-end gap-3">
          {user ? (
            <div className="flex items-center gap-4">
              <button onClick={handleLogout} className="my-btn hidden md:block">
                Logout
              </button>
              <Link 
                to="/profile"
                data-tooltip-id="user-tooltip"
                data-tooltip-content={user?.displayName}
                className="relative group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl border-2 border-emerald-500 p-0.5 overflow-hidden ring-4 ring-emerald-50 group-hover:scale-110 transition-transform duration-300">
                  <img
                    className="w-full h-full object-cover rounded-[7px]"
                    src={user?.photoURL || "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"}
                    alt="User"
                  />
                </div>
              </Link>
              <Tooltip id="user-tooltip" place="bottom" />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="px-5 py-2 text-slate-600 font-semibold hover:text-slate-900 transition-colors">
                Login
              </Link>
              <Link to="/register" className="my-btn">
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
              className="fixed top-0 left-0 h-full w-[80%] max-w-[320px] bg-white shadow-2xl z-50 flex flex-col p-8"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex justify-between items-center mb-10">
                <Link to="/" className="flex items-center gap-2">
                  <GrWheelchairActive className="text-3xl text-[#10B981]" />
                  <span className="text-2xl font-extrabold text-slate-800">
                    Daily<span className="text-emerald-500">Zone</span>
                  </span>
                </Link>
                <button
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <FaTimes className="text-xl text-slate-400" />
                </button>
              </div>

              <div className="flex flex-col gap-3">
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
                      `group relative flex items-center justify-between px-6 py-4 rounded-2xl text-lg font-black transition-all ${
                        isActive
                          ? "bg-emerald-50 text-emerald-600 pl-8"
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
                            className="absolute left-0 w-1.5 h-8 bg-emerald-500 rounded-r-full" 
                          />
                        )}
                        <span className={`opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? 'text-emerald-300' : 'text-slate-200'}`}>
                          →
                        </span>
                      </>
                    )}
                  </NavLink>
                ))}
              </div>

              <div className="mt-auto space-y-3">
                {user ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsDrawerOpen(false);
                    }}
                    className="w-full my-btn"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="w-full my-btn-2 block text-center"
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="w-full my-btn block text-center"
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
