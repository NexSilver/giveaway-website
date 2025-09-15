import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/faq", label: "FAQ" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50
                 bg-[#0f0f0f]/80 backdrop-blur-md border-b border-[#222]
                 flex justify-between items-center px-6 py-4"
    >
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-extrabold tracking-widest text-transparent bg-clip-text
                   bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_10px_rgba(0,255,255,0.6)]
                   hover:scale-105 transition-transform"
      >
        Nex<span className="text-purple-400">Silver</span>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-6 items-center">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`relative text-gray-300 hover:text-cyan-400
                       transition duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-1
                       after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-cyan-400 after:to-purple-500
                       hover:after:w-full after:transition-all after:duration-300
                       ${
                         location.pathname === link.to
                           ? "text-cyan-400 after:w-full"
                           : ""
                       }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="text-2xl text-gray-300 focus:outline-none"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0f0f0f]/95 backdrop-blur-md flex flex-col gap-4 px-6 py-4 border-t border-[#222]">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-gray-300 hover:text-cyan-400 transition duration-200 ${
                location.pathname === link.to ? "text-cyan-400" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
