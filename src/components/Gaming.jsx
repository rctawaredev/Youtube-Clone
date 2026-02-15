import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { SiYoutubegaming } from "react-icons/si";
import { useTheme } from "../context/ThemeContext";

const apiStatusConstants = {
  INITIAL: "INITIAL",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

const Gaming = () => {
  const { darkMode } = useTheme(); 
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL);
  const [gamingVideos, setGamingVideos] = useState([]);

  const getGamingVideos = async () => {
    setApiStatus(apiStatusConstants.IN_PROGRESS);

    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = "https://apis.ccbp.in/videos/gaming";

    try {
      const response = await fetch(apiUrl, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });

      if (response.ok) {
        const data = await response.json();

        const updatedData = data.videos.map((video) => ({
          id: video.id,
          title: video.title,
          thumbnailUrl: video.thumbnail_url,
          viewCount: video.view_count,
        }));

        setGamingVideos(updatedData);
        setApiStatus(apiStatusConstants.SUCCESS);
      } else {
        setApiStatus(apiStatusConstants.FAILURE);
      }
    } catch {
      setApiStatus(apiStatusConstants.FAILURE);
    }
  };

  useEffect(() => {
    getGamingVideos();
  }, []);



  const renderLoadingView = () => (
    <div className="flex justify-center items-center h-64">
      <BeatLoader color="#ef4444" />
    </div>
  );



  const renderFailureView = () => (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-xl font-semibold">
        Oops! Something Went Wrong
      </h1>
      <button
        onClick={getGamingVideos}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        Retry
      </button>
    </div>
  );



  const renderSuccessView = () => (
    <div>

      {/* Gaming Header */}
      <div
        className={`flex items-center gap-4 p-6 ${
          darkMode ? " text-white" : " text-black"
        }`}
      >
    
          <SiYoutubegaming className="text-red-500 text-4xl" />
     
        <h1 className="text-3xl font-bold">Gaming</h1>
      </div>

      {/* Gaming Grid */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-6">
        {gamingVideos.map((video) => (
          <li key={video.id}>
            <Link to={`/videos/${video.id}`}>

              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full rounded-lg"
              />

              <h1 className="mt-3 font-medium">
                {video.title}
              </h1>

              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {video.viewCount} Watching Worldwide
              </p>

            </Link>
          </li>
        ))}
      </ul>

    </div>
  );

  const renderView = () => {
    switch (apiStatus) {
      case apiStatusConstants.IN_PROGRESS:
        return renderLoadingView();
      case apiStatusConstants.SUCCESS:
        return renderSuccessView();
      case apiStatusConstants.FAILURE:
        return renderFailureView();
      default:
        return null;
    }
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {renderView()}
    </div>
  );
};

export default Gaming;