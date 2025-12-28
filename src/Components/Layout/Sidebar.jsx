import React from "react";
import { NavLink } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineUserGroup,
  HiOutlineDocumentText,
  HiOutlineTemplate,
  HiOutlinePaperAirplane,
  HiOutlineLogout,
} from "react-icons/hi";

const Sidebar = () => {
  return (
    <aside
      className="
        h-screen w-64
        bg-[#0F1117]
        border-r border-[#23283A]
        flex flex-col
      "
    >
      <div className="h-16 flex items-center px-6 border-b border-[#23283A]">
        <span className="font-['Playfair_Display'] text-xl text-gray-100">
          HireFlow
        </span>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1">
        <NavItem to="/dashboard" icon={<HiOutlineHome />} label="Dashboard" />
        <NavItem
          to="/recruiters"
          icon={<HiOutlineUserGroup />}
          label="Recruiters"
        />
        <NavItem
          to="/resumes"
          icon={<HiOutlineDocumentText />}
          label="Resumes"
        />
        <NavItem
          to="/templates"
          icon={<HiOutlineTemplate />}
          label="Templates"
        />
        <NavItem
          to="/send/single"
          icon={<HiOutlinePaperAirplane />}
          label="Send"
        />
      </nav>

      <div className="px-4 py-4 border-t border-[#23283A]">
        <button
          className="
            flex items-center gap-2
            text-sm text-gray-400
            hover:text-red-400
            transition
          "
        >
          <HiOutlineLogout />
          Logout
        </button>
      </div>
    </aside>
  );
};

const NavItem = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        flex items-center gap-3
        px-3 py-2.5
        rounded-xl
        text-sm
        transition
        ${
          isActive
            ? "bg-[#161A22] text-gray-100 border border-[#23283A]"
            : "text-gray-400 hover:text-gray-100 hover:bg-[#161A22]"
        }
        `
      }
    >
      <span className="text-lg">{icon}</span>
      {label}
    </NavLink>
  );
};

export default Sidebar;
