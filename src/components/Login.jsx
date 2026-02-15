import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FaLinkedin } from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  const navigate = useNavigate();

  const onSuccessLogin = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expires: 30 });
    navigate("/", { replace: true });
  };

  const onFailureLogin = (errorMsg) => {
    setErrorMsg(errorMsg);
    setShowErrorMsg(true);
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();

    const userDetails = { username, password };

    const response = await fetch("https://apis.ccbp.in/login", {
      method: "POST",
      body: JSON.stringify(userDetails),
    });

    const data = await response.json();

    if (response.ok) {
      onSuccessLogin(data.jwt_token);
    } else {
      onFailureLogin(data.error_msg);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      

      <form
        onSubmit={onSubmitForm}
        className="bg-white shadow-lg rounded-lg p-8 w-90"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="website logo"
          className="h-10 mx-auto mb-6"
        />

      
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            USERNAME
          </label>
          <input
            type="text"
            value={username}
            placeholder="rahul"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

      
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            PASSWORD
          </label>
          <input
            type="password"
            value={password}
            placeholder="rahul@2021"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-red-400 transition duration-200"
        >
          Login
        </button>

        {showErrorMsg && (
          <p className="text-red-500 text-sm mt-3">
            *{errorMsg}
          </p>
        )}
      </form>

   
      <div className="mt-6 text-center text-sm text-gray-600">
        <p>
          Built with ❤️ by{" "}
          <span className="font-semibold">Rohan Taware</span>
        </p>

        <a
          href="https://www.linkedin.com/in/rctaware/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-2 
                     text-blue-600 hover:text-blue-800 
                     hover:scale-105 transition duration-200"
        >
          <FaLinkedin className="text-lg" />
          Connect on LinkedIn
        </a>
      </div>

    </div>
  );
};

export default Login;