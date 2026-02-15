import "./App.css";
import Login from "./components/Login.jsx";
import ProtectedLayout from "./components/ProtectedLayout.jsx";

import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <div>
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<ProtectedLayout />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
