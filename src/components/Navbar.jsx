import { useTheme } from "../context/ThemeContext";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // Open modal only
  const onClickLogout = () => {
    setShowModal(true);
  };

  // Confirm logout
  const confirmLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login", { replace: true });
  };

  // Cancel logout
  const cancelLogout = () => {
    setShowModal(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-14 bg-slate-100  z-40">
        <div className="flex items-center justify-between h-full px-4">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="logo"
            className="h-8"
          />

          <div className="flex items-center gap-4">
            {darkMode ? (
              <CiLight
                className="text-2xl cursor-pointer"
                onClick={toggleTheme}
              />
            ) : (
              <MdDarkMode
                className="text-2xl cursor-pointer"
                onClick={toggleTheme}
              />
            )}

            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
              className="h-8"
            />

            
            <IoIosLogOut
              className="text-2xl cursor-pointer lg:hidden"
              onClick={onClickLogout}
            />

          
            <button
              onClick={onClickLogout}
              className="hidden lg:block border border-slate-900 
                         rounded-md px-3 py-1 text-sm 
                         hover:bg-red-500 hover:text-white hover:border-0" 
            >
              Log Out
            </button>
          </div>
        </div>
      </nav>

     
      {showModal && (
        <div className="fixed inset-0
                        flex items-center justify-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg 
                          w-80 shadow-xl">

            <p className="text-center mb-6 text-lg">
              Are you sure you want to logout?
            </p>

            <div className="flex justify-between">
              <button
                onClick={cancelLogout}
                className="border border-gray-400 px-4 py-2 rounded-md 
                           hover:bg-gray-700"
              >
                Cancel
              </button>

              <button
                onClick={confirmLogout}
                className="bg-blue-500 px-4 py-2 rounded-md 
                           hover:bg-blue-600"
              >
                Confirm
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;