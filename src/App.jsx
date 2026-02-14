import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import Trending from "./components/Trending.jsx";
import Gaming from "./components/Gaming.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Footer from './components/Footer.jsx';
import Login from './components/Login.jsx'
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import NavFooter from "./components/NavFooter.jsx";
import ProtectedLayout from "./components/ProtectedLayout.jsx";

import SavedVideos from "./components/SavedVideos.jsx";

import {Route, Routes} from 'react-router-dom'

const App = () => {
  return (
    <>
      <div>
        <div >
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

