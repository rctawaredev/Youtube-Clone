import { NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BsFire } from "react-icons/bs";
import { SiYoutubegaming } from "react-icons/si";
import { PiListPlusBold } from "react-icons/pi";
import { useTheme } from "../context/ThemeContext"; 

const Footer = () => {
  const { darkMode } = useTheme(); 

  return (
    <ul
      className={`fixed bottom-0 left-0 right-0 h-14
                  ${darkMode ? "bg-zinc-900" : "bg-slate-200"}
                  flex items-center justify-around md:hidden`}
    >
      <NavLink to="/" end>
        {({ isActive }) => (
          <AiFillHome
            className={`text-3xl ${
              isActive
                ? "text-red-500"
                : darkMode
                ? "text-gray-400"
                : "text-neutral-500"
            }`}
          />
        )}
      </NavLink>

      <NavLink to="/trending">
        {({ isActive }) => (
          <BsFire
            className={`text-3xl ${
              isActive
                ? "text-red-500"
                : darkMode
                ? "text-gray-400"
                : "text-neutral-500"
            }`}
          />
        )}
      </NavLink>

      <NavLink to="/gaming">
        {({ isActive }) => (
          <SiYoutubegaming
            className={`text-3xl ${
              isActive
                ? "text-red-500"
                : darkMode
                ? "text-gray-400"
                : "text-neutral-500"
            }`}
          />
        )}
      </NavLink>

      <NavLink to="/saved">
        {({ isActive }) => (
          <PiListPlusBold
            className={`text-3xl ${
              isActive
                ? "text-red-500"
                : darkMode
                ? "text-gray-400"
                : "text-neutral-500"
            }`}
          />
        )}
      </NavLink>
    </ul>
  );
};

export default Footer;