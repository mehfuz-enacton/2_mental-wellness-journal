import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinkClass = ({isActive}:{isActive:boolean})=> `transition cursor-pointer ${isActive ? "text-[#F6F7F3] border-b-2 border-[#F6F7F3]":"hover:text-[#F6F7F3]"}`

  return (
    <nav className="bg-[#6B8E7F] border-b border-[#E2E5DE]">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-[#F6F7F3] flex items-center justify-center text-white font-semibold">
            🌿
          </div>
          <span className="text-xl font-semibold text-[#2F3E46]">
            Mind Journal
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-[#2F3E46] font-medium">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/journal" className={navLinkClass}>Journal</NavLink>
          <NavLink to="/mood" className={navLinkClass}>Mood</NavLink>
          <NavLink to="/calendar" className={navLinkClass}>Calendar</NavLink>
          <NavLink to="/trends" className={navLinkClass}>Trends</NavLink>
        </div>

        <button
          className="md:hidden text-[#2F3E46] text-2xl hover:text-[#F6F7F3] transition cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#6B8E7F] border-t border-[#6B8E7F] px-4 pb-4">
          <div className="flex flex-col gap-4 pt-4 text-[#2F3E46] font-medium">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/journal" className={navLinkClass}>Journal</NavLink>
            <NavLink to="/mood" className={navLinkClass}>Mood</NavLink>
            <NavLink to="/calendar" className={navLinkClass}>Calendar</NavLink>
            <NavLink to="/trends" className={navLinkClass}>Trends</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
