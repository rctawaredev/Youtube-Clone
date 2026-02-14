import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import ProtectedRoute from "./ProtectedRoute";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Trending from "./Trending";
import Gaming from "./Gaming";
import SavedVideos from "./SavedVideos";
import VideoDetails from "./VideoDetails";

const ProtectedLayout = () => {
  return (
    <ProtectedRoute>
      <div className="flex h-screen">
        <Navbar />
        <Sidebar />
        <Footer />

        <main className="w-full mt-14 md:ml-62.5  bg-gray-50 overflow-y-auto ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/gaming" element={<Gaming />} />
            <Route path="/saved" element={<SavedVideos />} />
            <Route path="/videos/:id" element={ <VideoDetails />}/>
          </Routes>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default ProtectedLayout;