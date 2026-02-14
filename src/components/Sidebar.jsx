import { NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BsFire } from "react-icons/bs";
import { SiYoutubegaming } from "react-icons/si";
import { PiListPlusBold } from "react-icons/pi";

const Sidebar = () => {
  return (
    <div className="hidden fixed left-0 top-0 mt-14 md:flex w-[250px] flex-col justify-between bg-slate-100 h-screen">
      <ul>

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 text-lg p-3 px-6 cursor-pointer ${
              isActive ? "bg-gray-300" : "hover:bg-gray-200"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <AiFillHome
                className={`text-3xl ${
                  isActive ? "text-red-500" : "text-neutral-500"
                }`}
              />
              Home
            </>
          )}
        </NavLink>

        <NavLink
          to="/trending"
          className={({ isActive }) =>
            `flex items-center gap-3 text-lg p-3 px-6 cursor-pointer ${
              isActive ? "bg-gray-300" : "hover:bg-gray-200"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <BsFire
                className={`text-3xl ${
                  isActive ? "text-red-500" : "text-neutral-500"
                }`}
              />
              Trending
            </>
          )}
        </NavLink>

        <NavLink
          to="/gaming"
          className={({ isActive }) =>
            `flex items-center gap-3 text-lg p-3 px-6 cursor-pointer ${
              isActive ? "bg-gray-300" : "hover:bg-gray-200"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <SiYoutubegaming
                className={`text-3xl ${
                  isActive ? "text-red-500" : "text-neutral-500"
                }`}
              />
              Gaming
            </>
          )}
        </NavLink>

        <NavLink
          to="/saved"
          className={({ isActive }) =>
            `flex items-center gap-3 text-lg p-3 px-6 cursor-pointer ${
              isActive ? "bg-gray-300" : "hover:bg-gray-200"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <PiListPlusBold
                className={`text-3xl ${
                  isActive ? "text-red-500" : "text-neutral-500"
                }`}
              />
              Saved Videos
            </>
          )}
        </NavLink>

      </ul>

      <div className="px-4 py-20">
        <h1 className="text-xl pb-4 font-medium">CONTACT US</h1>
        <ul className="flex gap-3">
          <li>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
              className="h-6"
            />
          </li>
          <li>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
              className="h-6"
            />
          </li>
          <li>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
              className="h-6"
            />
          </li>
        </ul>
        <p className="text-lg pt-4 ">
          Enjoy! Now to see your channels and recommendations!
        </p>
      </div>
    </div>
  );
};

export default Sidebar;