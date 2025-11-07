import React from "react";
import { Link } from "react-router-dom";
import { Github, Mail, Instagram } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-black text-gray-200 border-t border-yellow-500/20 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left Side - Logo / Title */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-yellow-400 text-black text-xl shadow-lg shadow-yellow-500/30">
            ⚡
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-yellow-400 drop-shadow-md">
            Study Predictor
          </h3>
        </div>

        {/* Center - Links */}
        <div className="flex space-x-8 text-sm font-semibold">
          <a
            href="/about"
            className="relative group"
          >
            <span className="text-gray-300 group-hover:text-yellow-400 transition-all duration-300">
              About
            </span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 group-hover:w-full transition-all duration-300 rounded-full"></span>
          </a>

          <a
            href="/upload"
            className="relative group"
          >
            <span className="text-gray-300 group-hover:text-yellow-400 transition-all duration-300">
              Upload
            </span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 group-hover:w-full transition-all duration-300 rounded-full"></span>
          </a>

          <a
            href="/contact"
            className="relative group"
          >
            <span className="text-gray-300 group-hover:text-yellow-400 transition-all duration-300">
              Contact
            </span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 group-hover:w-full transition-all duration-300 rounded-full"></span>
          </a>
        </div>

        {/* Right Side - Social Icons */}
        <div className="flex space-x-5 text-gray-400">
          <Link
            to="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 hover:scale-110 transition-all duration-300"
          >
            <Github size={22} />
          </Link>
          <Link
            to="mailto:example@email.com"
            className="hover:text-yellow-400 hover:scale-110 transition-all duration-300"
          >
            <Mail size={22} />
          </Link>
          <Link
            to="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 hover:scale-110 transition-all duration-300"
          >
            <Instagram size={22} />
          </Link>
        </div>
      </div>

      {/* Divider Line */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent"></div>

      {/* Bottom Text */}
      <div className="text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-yellow-400">Mohit Thakur</span>. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
