import { useTheme } from "../context/ThemeContext";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";

const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme();
  return (
    <nav className="fixed h-14 w-screen bg-slate-100">
      <div className="flex items-center justify-between py-3 px-2">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          className="h-12 md:h-12 px-4 py-2"
        />
        <div className="flex items-center gap-3 px-2">
          {darkMode ? (
            <CiLight className="text-3xl" onClick={toggleTheme} />
          ) : (
            <MdDarkMode className="text-3xl" onClick={toggleTheme} />
          )}

          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
            className="h-8"
          />
          <IoIosLogOut className="text-3xl lg:hidden" />
          <button className="lg:block hidden hover:bg-red-500 hover:text-white hover:border-0 border border-x-slate-900 rounded-md px-2  text-sm h-8">
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
