import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { GrWheelchairActive } from "react-icons/gr";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row md:justify-between md:items-center">
        
        {/* Logo and Website Name */}
        <div className="flex items-center mb-6 md:mb-0">
          <a className="text-2xl font-bold flex items-center gap-1">
                    <GrWheelchairActive color="#3BB143" />
                    <span>Daily</span>
                    <span className="color-primary">Zone</span>
                  </a>
        </div>

        {/* Contact Details */}
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <p>Email: Daily@Zone.com</p>
          <p>Phone: +123 456xxxxx7890</p>
        </div>

        {/* Terms & Social Links */}
        <div className="flex flex-col md:flex-row md:items-center md:gap-6 text-center md:text-left">
          <a href="/terms" className="hover:underline mb-3 md:mb-0">Terms & Conditions</a>
          
          <div className="flex gap-4 justify-center md:justify-start">
            <a href="#" className="hover:text-gray-400"><FaFacebookF /></a>
            <a href="#" className="hover:text-gray-400"><FaTwitter /></a>
            <a href="#" className="hover:text-gray-400"><FaInstagram /></a>
            <a href="#" className="hover:text-gray-400"><FaLinkedinIn /></a>
          </div>
        </div>

      </div>

      {/* Bottom Text */}
      <div className="mt-6 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} DailyZone. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
