import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { FaGoogle, FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const { isDark } = useTheme();
  const { googleSignIn, login, setUser } = useAuth();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const regex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!regex.test(password)) {
      setError("Invalid password format. Check requirements.");
      return;
    }

    setLoading(true);
    try {
      const result = await login(email, password);
      if (result?.user) {
        Swal.fire({
          title: "Welcome Back!",
          text: "Logging you into your dashboard.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          background: '#ffffff',
        });
        setUser(result.user);
        navigate(location.state || "/");
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      if (result?.user) {
        setUser(result.user);
        navigate(location.state || "/");
      }
    } catch (error) {
       console.error(error);
    }
  };

  return (
    <div className={`min-h-screen grid lg:grid-cols-2 transition-colors duration-300 ${
      isDark ? 'bg-slate-950' : 'bg-[#F8FAFC]'
    }`}>
      <title>DailyZone - Welcome Back</title>
      
      {/* Visual Side */}
      <div className="hidden lg:flex relative bg-slate-900 justify-center items-center p-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2000')] bg-cover bg-center opacity-40 blur-[2px]" />
        <div className="absolute inset-0 bg-emerald-900/40" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-center space-y-8"
        >
          <div className="w-24 h-24 bg-emerald-500 rounded-3xl mx-auto flex items-center justify-center shadow-2xl rotate-12">
            <span className="text-white text-5xl font-black -rotate-12">D</span>
          </div>
          <div className="space-y-4">
            <h2 className="text-5xl font-black text-white leading-tight">Master Your <br/><span className="text-emerald-500">Routines.</span></h2>
            <p className="text-slate-300 text-xl max-w-sm mx-auto">"Consistency is the only currency that matters in the pursuit of greatness."</p>
          </div>
        </motion.div>
      </div>

      {/* Form Side */}
      <div className="flex justify-center items-center p-6 lg:p-20">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md space-y-10"
        >
          <div className="space-y-3">
            <h1 className={`text-4xl lg:text-5xl font-black transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>Sign In.</h1>
            <p className={`font-bold transition-colors duration-300 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>New to DailyZone? <Link to="/register" className="text-emerald-500 hover:text-emerald-600 underline">Create account</Link></p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="input-group group">
                <FaEnvelope className="input-icon" />
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="input-field"
                />
              </div>

              <div className="input-group group pr-2">
                <FaLock className="input-icon" />
                <input
                  required
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="input-field"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-2 text-slate-400 hover:text-emerald-500 transition-colors shrink-0"
                >
                  {showPassword ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
                </button>
              </div>
            </div>

            {error && <p className={`text-rose-500 text-sm font-bold p-3 rounded-lg border transition-colors duration-300 ${isDark ? 'bg-rose-950/30 border-rose-900/50' : 'bg-rose-50 border-rose-100'}`}>{error}</p>}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full my-btn py-5 text-lg font-black tracking-widest shadow-xl shadow-emerald-500/20 disabled:opacity-70"
            >
              {loading ? "Authenticating..." : "Sign In to DailyZone"}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className={`w-full border-t ${isDark ? 'border-slate-700' : 'border-slate-200'}`}></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className={`px-4 font-black tracking-widest transition-colors duration-300 ${
              isDark ? 'bg-slate-950 text-slate-500' : 'bg-[#F8FAFC] text-slate-400'
            }`}>Or social login</span></div>
          </div>

          <button 
            type="button" 
            onClick={handleGoogleSignIn}
            className={`w-full py-4 border-2 rounded-2xl flex items-center justify-center gap-4 font-bold transition-all shadow-sm ${
              isDark 
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:border-slate-600'
                : 'bg-white border-slate-100 text-slate-700 hover:bg-slate-50 hover:border-slate-200'
            }`}
          >
            <FaGoogle className="text-rose-500" /> Continue with Google
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
