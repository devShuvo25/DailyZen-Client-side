import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { FaGoogle, FaUser, FaEnvelope, FaLock, FaImage, FaArrowRight } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";

const Registere = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const { createAccount, googleSignIn, setUser, updateUserProfile } = useAuth();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const regex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.photoURL.value;
    const password = e.target.password.value;

    if (!regex.test(password)) {
      setError("Password needs 6+ chars, uppercase & lowercase.");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      const result = await createAccount(email, password);
      if (result?.user) {
        await updateUserProfile(name, photoURL);
        Swal.fire({
          title: "Account Created!",
          text: "Welcome to the elite habit building community.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          background: '#ffffff',
        });
        setUser({ ...result.user, displayName: name, photoURL });
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      if (result?.user) {
        setUser(result.user);
        navigate("/");
      }
    } catch (error) {
       console.error(error);
    }
  };

  return (
    <div className={`min-h-screen grid lg:grid-cols-2 transition-colors duration-300 ${
      isDark ? 'bg-slate-950' : 'bg-[#F8FAFC]'
    }`}>
      <title>DailyZone - Create Account</title>
      
      {/* Form Side */}
      <div className="flex justify-center items-center p-6 lg:p-20">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md space-y-10"
        >
          <div className="space-y-3">
            <h1 className={`text-4xl lg:text-5xl font-black transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>Join Us.</h1>
            <p className={`font-bold transition-colors duration-300 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>Already a member? <Link to="/login" className="text-indigo-600 hover:text-indigo-700 underline">Sign in instead</Link></p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="input-group group">
                <FaUser className="input-icon" />
                <input required name="name" placeholder="Full Name" className="input-field" />
              </div>

              <div className="input-group group">
                <FaEnvelope className="input-icon" />
                <input required name="email" type="email" placeholder="Email Address" className="input-field" />
              </div>

              <div className="input-group group">
                <FaImage className="input-icon" />
                <input required name="photoURL" placeholder="Avatar Image URL" className="input-field" />
              </div>

              <div className="input-group group pr-2">
                <FaLock className="input-icon" />
                <input
                  required
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Strong Password"
                  className="input-field"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="p-2 text-slate-400 hover:text-emerald-500 transition-colors shrink-0">
                  {showPassword ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
                </button>
              </div>
            </div>

            {error && <p className={`text-rose-500 text-sm font-bold p-3 rounded-lg border transition-colors duration-300 ${isDark ? 'bg-rose-950/30 border-rose-900/50' : 'bg-rose-50 border-rose-100'}`}>{error}</p>}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full my-btn py-5 text-lg font-black tracking-widest shadow-xl shadow-emerald-500/20 disabled:opacity-70 group"
            >
              {loading ? "Creating..." : "Start Your Journey"} <FaArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <button 
            type="button" 
            onClick={handleGoogleSignIn}
            className={`w-full py-4 border-2 rounded-2xl flex items-center justify-center gap-4 font-bold transition-all shadow-sm ${
              isDark 
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:border-slate-600'
                : 'bg-white border-slate-100 text-slate-700 hover:bg-slate-50 hover:border-slate-200'
            }`}
          >
            <FaGoogle className="text-rose-500" /> Sign up with Google
          </button>
        </motion.div>
      </div>

      {/* Visual Side */}
      <div className="hidden lg:flex relative bg-slate-900 justify-center items-center p-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506784919140-50d436d44547?q=80&w=2000')] bg-cover bg-center opacity-40 blur-[1px]" />
        <div className="absolute inset-0 bg-emerald-900/40" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-center space-y-8"
        >
          <div className="w-24 h-24 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl mx-auto flex items-center justify-center shadow-2xl skew-y-3">
             <div className="w-12 h-12 bg-emerald-500 rounded-xl" />
          </div>
          <div className="space-y-4">
            <h2 className="text-5xl font-black text-white leading-tight underline decoration-emerald-500 underline-offset-8">Progress.</h2>
            <p className="text-slate-200 text-xl font-medium max-w-sm mx-auto">Join the collective effort to build better lives through consistent daily habits.</p>
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default Registere;
