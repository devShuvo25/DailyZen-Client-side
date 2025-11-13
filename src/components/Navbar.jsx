import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, NavLink, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { GrWheelchairActive } from "react-icons/gr";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogout = () => {
    logout()
      .then(() => {
        Swal.fire({
          title: "Succesfully logged out",
          icon: "success",
          draggable: true,
        });
        navigate("/login");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-5 sticky top-0 z-50">
      {/* LEFT: Logo + Hamburger */}
      <div className="navbar-start flex items-center gap-3">
        <button
          className="lg:hidden text-2xl text-gray-700"
          onClick={() => setIsDrawerOpen(true)}
        >
          <FaBars />
        </button>

        <a className="text-2xl font-bold flex items-center gap-1">
          <GrWheelchairActive color="#3BB143" />
          <span>Daily</span>
          <span className="color-primary">Zone</span>
        </a>
      </div>

      {/* CENTER: Desktop NavLinks */}
      <div className="navbar-center hidden lg:flex gap-5 items-center">
        {["/", "/add-habit", "/my-habits", "/public-habits"].map((path, i) => {
          const names = ["Home", "Add Habit", "My Habits", "Public Habits"];
          return (
            <NavLink
              key={i}
              to={path}
              className={({ isActive }) =>
                isActive
                  ? "color-primary font-semibold underline"
                  : "color-text font-semibold"
              }
            >
              {names[i]}
            </NavLink>
          );
        })}
      </div>

      {/* RIGHT: User or Auth Buttons */}
      <div className="navbar-end">
        {user ? (
          <div className="flex justify-center items-center gap-5">
            <button onClick={handleLogout} className="btn my-btn">
              Logout
            </button>
            <button className="rounded-full border-2 border-[#3BB143] p-[2px]">
              <img
                className="h-[30px] w-[30px] rounded-full"
                src={
                  user?.photoURL ||
                  "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
                }
                alt="User"
              />
            </button>
          </div>
        ) : (
          <div className="flex justify-between gap-5">
            <Link to={"/login"} className="btn my-btn">
              Login
            </Link>
            <Link to={"/register"} className="btn my-btn">
              Sign Up
            </Link>
          </div>
        )}
      </div>

      {/* ✅ Mobile Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Drawer Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
            />

            {/* Drawer Content */}
            <motion.div
              className="fixed top-0 left-0 h-full w-[75%] max-w-[280px] bg-white shadow-xl z-50 flex flex-col p-6"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2 text-2xl font-bold">
                  <GrWheelchairActive color="#3BB143" />
                  <span>Daily</span>
                  <span className="color-primary">Zone</span>
                </div>
                <button
                  className="text-xl text-gray-600"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <FaTimes />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {["/", "/add-habit", "/my-habits", "/public-habits"].map(
                  (path, i) => {
                    const names = [
                      "Home",
                      "Add Habit",
                      "My Habits",
                      "Public Habits",
                    ];
                    return (
                      <NavLink
                        key={i}
                        to={path}
                        onClick={() => setIsDrawerOpen(false)}
                        className={({ isActive }) =>
                          `text-lg font-semibold transition-all ${
                            isActive
                              ? "text-[#3BB143] underline"
                              : "text-gray-700 hover:text-[#3BB143]"
                          }`
                        }
                      >
                        {names[i]}
                      </NavLink>
                    );
                  }
                )}
              </div>

              <div className="mt-auto pt-6 border-t border-gray-200">
                {user ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsDrawerOpen(false);
                    }}
                    className="btn w-full bg-[#3BB143] text-white font-semibold rounded-lg"
                  >
                    Logout
                  </button>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link
                      to={"/login"}
                      className="btn w-full bg-[#3BB143] text-white font-semibold rounded-lg"
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to={"/register"}
                      className="btn w-full border border-[#3BB143] text-[#3BB143] font-semibold rounded-lg"
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
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
