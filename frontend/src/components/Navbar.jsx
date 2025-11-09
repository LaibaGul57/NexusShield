import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navLinks = ["Home", "about", "nudges", "report", "settings"];

  return (
    <nav className="relative bg-[#001f3f] text-white flex justify-between items-center px-6 py-3">
      <div className="text-xl font-bold text-[#00e0ff]">NS</div>

      {/*  Links */}
      <ul className="hidden md:flex gap-6">
        {navLinks.map((link) => (
          <li key={link}>
            <Link to={`/${link}`} className="hover:text-[#00ff99]">
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-2xl font-bold"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Mobile Drawer */}
      <ul
        className={`absolute top-full left-0 w-full bg-[#001f3f] flex flex-col gap-3 p-4 md:hidden transition-all duration-300 ${
          open ? "max-h-96" : "max-h-0 overflow-hidden"
        }`}
      >
        {navLinks.map((link) => (
          <li key={link}>
            <Link
              to={`/${link}`}
              className="block hover:text-[#00ff99]"
              onClick={() => setOpen(false)}
            >
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
