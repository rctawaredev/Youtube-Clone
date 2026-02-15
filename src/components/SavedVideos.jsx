import { useSavedVideos } from "../context/SavedVideosContext";
import { Link } from "react-router-dom";
import { PiListPlusBold } from "react-icons/pi";
import { useTheme } from "../context/ThemeContext"; 

const SavedVideos = () => {
  const { savedVideos } = useSavedVideos();
  const { darkMode } = useTheme(); 

  if (savedVideos.length === 0) {
    return (
      <div
        className={`flex flex-col items-center pt-20 min-h-screen ${
          darkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
          alt="no saved"
          className="h-60"
        />
        <h1 className="text-xl font-semibold mt-4">
          No saved videos found
        </h1>
        <p
          className={`mt-2 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          You can save videos while watching them
        </p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >

 
      <div
        className={`flex items-center gap-4 p-6 ${
          darkMode ? " text-white" : " text-black"
        }`}
      >
       
        <PiListPlusBold className="text-red-500 text-4xl"/>
    
        <h1 className="text-2xl font-bold">Saved Videos</h1>
      </div>

     
      <ul className="p-6 space-y-8">
        {savedVideos.map((video) => (
          <li key={video.id}>
            <Link to={`/videos/${video.id}`}>
              <div className="flex flex-col md:flex-row gap-6">

                {/* Thumbnail */}
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full md:w-[400px] h-56 object-cover rounded"
                />

                {/* Details */}
                <div className="flex flex-col gap-3">
                  <h1 className="text-lg font-medium">
                    {video.title}
                  </h1>

                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {video.channel.name}
                  </p>

                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-500" : "text-gray-500"
                    }`}
                  >
                    {video.viewCount} views • {video.publishedAt}
                  </p>
                </div>

              </div>
            </Link>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default SavedVideos;