import { NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BsFire } from "react-icons/bs";
import { SiYoutubegaming } from "react-icons/si";
import { PiListPlusBold } from "react-icons/pi";

const Footer = () => {
  return (
    <ul className="fixed bottom-0 left-0 w-full h-14 
                   bg-slate-200 flex items-center justify-around 
                   md:hidden">

      <NavLink to="/" end>
        {({ isActive }) => (
          <AiFillHome
            className={`text-3xl ${
              isActive ? "text-red-500" : "text-neutral-500"
            }`}
          />
        )}
      </NavLink>

      <NavLink to="/trending">
        {({ isActive }) => (
          <BsFire
            className={`text-3xl ${
              isActive ? "text-red-500" : "text-neutral-500"
            }`}
          />
        )}
      </NavLink>

      <NavLink to="/gaming">
        {({ isActive }) => (
          <SiYoutubegaming
            className={`text-3xl ${
              isActive ? "text-red-500" : "text-neutral-500"
            }`}
          />
        )}
      </NavLink>

      <NavLink to="/saved">
        {({ isActive }) => (
          <PiListPlusBold
            className={`text-3xl ${
              isActive ? "text-red-500" : "text-neutral-500"
            }`}
          />
        )}
      </NavLink>

    </ul>
  );
};

export default Footer;
