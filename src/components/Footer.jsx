import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { GrWheelchairActive } from "react-icons/gr";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-slate-800 pb-12 mb-10">
        
        {/* Brand & Mission */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-500/10 rounded-xl">
              <GrWheelchairActive className="text-3xl text-[#10B981]" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight">
              Daily<span className="text-[#10B981]">Zone</span>
            </span>
          </div>
          <p className="text-slate-400 leading-relaxed max-w-sm">
            Empowering you to build lasting habits and transform your life, one small step at a time. Join our community of consistent achievers.
          </p>
        </div>

        {/* Contact info */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-white">Quick Links</h3>
          <ul className="space-y-4 text-slate-400">
            <li><a href="/" className="hover:text-emerald-500 transition-colors">Home Dashboard</a></li>
            <li><a href="/public-habits" className="hover:text-emerald-500 transition-colors">Public Library</a></li>
            <li><a href="/add-habit" className="hover:text-emerald-500 transition-colors">Start New Habit</a></li>
            <li><a href="/contact" className="hover:text-emerald-500 transition-colors">Contact Support</a></li>
          </ul>
        </div>

        {/* Social & Newsletter */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-white">Follow Us</h3>
          <div className="flex gap-4">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-emerald-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
          <div className="pt-4">
            <a href="/terms" className="text-slate-400 hover:text-emerald-500 transition-colors text-sm">Terms & Conditions</a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} DailyZone. Created with ❤️ for a better you.</p>
      </div>
    </footer>
  );
};

export default Footer;
