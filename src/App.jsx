import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import Trending from "./components/Trending.jsx";
import Gaming from "./components/Gaming.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Footer from './components/Footer.jsx';

import SavedVideos from "./components/SavedVideos.jsx";

import {Route, Routes} from 'react-router-dom'

const App = () => {
  return (
    <>
      <Navbar/>
      <div className="flex h-screen">
        <Sidebar />

        <div className="lg:w-[100%]  bg-gray-50 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/gaming" element={<Gaming />} />
            <Route path="/saved" element={<SavedVideos />} />
          </Routes>
        </div>
      </div>
      <Footer/>
    </>
    
  );
};

export default App;

