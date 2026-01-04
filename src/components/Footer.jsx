import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { GrWheelchairActive } from "react-icons/gr";
import useTheme from "../hooks/useTheme";

const Footer = () => {
  const { isDark } = useTheme();
  
  return (
    <footer className={`pt-20 pb-10 transition-colors duration-300 ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-900 text-white'}`}>
      <div className={`max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 border-b pb-12 mb-10 ${isDark ? 'border-slate-800' : 'border-slate-800'}`}>
        
        {/* Brand & Mission */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-xl ${isDark ? 'bg-emerald-500/20' : 'bg-emerald-500/10'}`}>
              <GrWheelchairActive className="text-3xl text-[#10B981]" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight">
              Daily<span className="text-[#10B981]">Zone</span>
            </span>
          </div>
          <p className={`leading-relaxed max-w-sm ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
            Empowering you to build lasting habits and transform your life, one small step at a time. Join our community of consistent achievers.
          </p>
        </div>

        {/* Contact info */}
        <div className="space-y-6">
          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-white'}`}>Quick Links</h3>
          <ul className={`space-y-4 ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
            <li><a href="/" className="hover:text-emerald-500 transition-colors">Home Dashboard</a></li>
            <li><a href="/public-habits" className="hover:text-emerald-500 transition-colors">Public Library</a></li>
            <li><a href="/add-habit" className="hover:text-emerald-500 transition-colors">Start New Habit</a></li>
            <li><a href="/contact" className="hover:text-emerald-500 transition-colors">Contact Support</a></li>
          </ul>
        </div>

        {/* Social & Newsletter */}
        <div className="space-y-6">
          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-white'}`}>Follow Us</h3>
          <div className="flex gap-4">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 ${
                  isDark 
                    ? 'bg-slate-900 text-slate-400 hover:bg-emerald-500 hover:text-white' 
                    : 'bg-slate-800 text-slate-400 hover:bg-emerald-500 hover:text-white'
                }`}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
          <div className="pt-4">
            <a href="/terms" className={`text-sm transition-colors ${isDark ? 'text-slate-400 hover:text-emerald-500' : 'text-slate-400 hover:text-emerald-500'}`}>Terms & Conditions</a>
          </div>
        </div>

      </div>

      <div className={`max-w-7xl mx-auto px-6 text-center text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
        <p>&copy; {new Date().getFullYear()} DailyZone. Created with ❤️ for a better you.</p>
      </div>
    </footer>
  );
};

export default Footer;
