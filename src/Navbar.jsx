import React, { useState } from "react";
import { Menu, X, Home, Info, Upload, Mail } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "About", path: "/about", icon: <Info size={18} /> },
    { name: "Upload", path: "/upload", icon: <Upload size={18} /> },
    { name: "Contact", path: "/contact", icon: <Mail size={18} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-lg shadow-lg border-b border-yellow-400/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 text-white font-extrabold text-2xl tracking-wide"
        >
          <span className="bg-yellow-400 text-black px-3 py-1 rounded-lg font-bold">
            Study Time
          </span>
          Predictor
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center gap-2 text-white/80 font-medium hover:text-yellow-400 transition-all duration-300 hover:scale-105"
            >
              {item.icon}
              {item.name}
            </Link>
          ))}

          
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-yellow-400 p-2 rounded-md hover:bg-white/10 transition"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md px-6 py-4 flex flex-col gap-5 text-white font-medium shadow-xl border-t border-yellow-400/20 animate-slideDown">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 hover:text-yellow-400 transition-all duration-300"
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
          
        </div>
      )}
    </nav>
  );
}

export default Navbar;
