import React from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const Navbar = () => {
  const {user,logout} =useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout()
    .then(result => {
      console.log('Succesfully logout', result)
      Swal.fire({
                  title: "Succesfully loged out",
                  icon: "success",
                  draggable: true,
                });
                navigate('/login')
    })
    .catch(err => {
      console.log(err.message)
    })
  }
    return (
        <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
       {/* All links are here */}
      </ul>
    </div>
    <a className=" text-2xl font-bold"><span className='color-primary'>My </span>Appli<span className='text-[#019EE3]'>cation</span></a>
  </div>
  <div className="navbar-center hidden lg:flex gap-5 items-center">
    <ul className="menu menu-horizontal px-1">
     {/* All links are here */}
     <Link to={'/'} className='color-text font-semibold'>Home</Link>
    </ul>
    <ul className="menu menu-horizontal px-1">
     {/* All links are here */}
     <Link to={'/add-habit'}  className='color-text font-semibold'>Add Habit</Link>
    </ul>
    <ul className="menu menu-horizontal px-1">
     {/* All links are here */}
     <Link to={'/my-habits'} className='color-text font-semibold'>My Habits</Link>
    </ul>
    <ul className="menu menu-horizontal px-1">
     {/* All links are here */}
     <Link to={'/public-habits'} className='color-text font-semibold'>Public Habits</Link>
    </ul>
  </div>
  <div className="navbar-end">
    {
      user? <Link onClick={handleLogout} className="btn my-btn">Logout</Link>
      :
      <Link to={'/login'} className="btn my-btn">Login</Link>
    }
  </div>
</div>
    );
};

export default Navbar;