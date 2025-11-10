import React from "react";
import useAuth from "../hooks/useAuth";
import { Link, NavLink, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { GrWheelchairActive } from "react-icons/gr";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout()
      .then((result) => {
        console.log("Succesfully logout", result);
        Swal.fire({
          title: "Succesfully loged out",
          icon: "success",
          draggable: true,
        });
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="navbar bg-base-100 shadow-sm px-5">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {/* All links are here */}
          </ul>
        </div>
        <a className=" text-2xl font-bold">
          <div className="flex justify-center items-center">
            <span><GrWheelchairActive color="#3BB143" /></span>
          <span className="">Daily </span>
          <span className="color-primary"> Zone</span></div>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex gap-5 items-center">
        <ul className="menu menu-horizontal px-1">
          {/* All links are here */}
          <NavLink to={"/"} className={({isActive}) => isActive? 'color-primary font-semibold underline':"color-text font-semibold"  }>
            Home
          </NavLink>
        </ul>
        <ul className="menu menu-horizontal px-1">
          {/* All links are here */}
          <NavLink to={"/add-habit"} className={({isActive}) => isActive? 'color-primary font-semibold underline':"color-text font-semibold"  }>
            Add Habit
          </NavLink>
        </ul>
        <ul className="menu menu-horizontal px-1">
          {/* All links are here */}
          <NavLink to={"/my-habits"} className={({isActive}) => isActive? 'color-primary font-semibold underline':"color-text font-semibold"  }>
            My Habits
          </NavLink>
        </ul>
        <ul className="menu menu-horizontal px-1">
          {/* All links are here */}
          <NavLink to={"/public-habits"} className={({isActive}) => isActive? 'color-primary font-semibold underline':"color-text font-semibold"  }>
            Public Habits
          </NavLink>
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="flex justify-center items-center gap-5">
            <Link onClick={handleLogout} className="btn my-btn">
            Logout
          </Link>
          <button className=" rounded-[50%] cursor-pointer">
            <img className="h-[20px] w-[20px] rounded-[50%]" src={user?.photoURL || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?cs=srgb&dl=pexels-italo-melo-881954-2379004.jpg&fm=jpg'} alt="" />
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
    </div>
  );
};

export default Navbar;
