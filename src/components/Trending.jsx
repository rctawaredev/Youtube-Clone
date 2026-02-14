import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { BsFire } from "react-icons/bs";

const apiStatusConstants = {
  INITIAL: "INITIAL",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

const Trending = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL);
  const [trendingVideos, setTrendingVideos] = useState([]);

  const getTrendingVideos = async () => {
    setApiStatus(apiStatusConstants.IN_PROGRESS);

    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = "https://apis.ccbp.in/videos/trending";

    try {
      const response = await fetch(apiUrl, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });

      if (response.ok) {
        const data = await response.json();

        const updatedData = data.videos.map((eachVideo) => ({
          id: eachVideo.id,
          title: eachVideo.title,
          thumbnailUrl: eachVideo.thumbnail_url,
          viewCount: eachVideo.view_count,
          publishedAt: eachVideo.published_at,
          channelName: eachVideo.channel.name,
        }));

        setTrendingVideos(updatedData);
        setApiStatus(apiStatusConstants.SUCCESS);
      } else {
        setApiStatus(apiStatusConstants.FAILURE);
      }
    } catch {
      setApiStatus(apiStatusConstants.FAILURE);
    }
  };

  useEffect(() => {
    getTrendingVideos();
  }, []);

  /* ---------------- Loading ---------------- */

  const renderLoadingView = () => (
    <div className="flex justify-center items-center h-64">
      <BeatLoader color="#ef4444" />
    </div>
  );

  /* ---------------- Failure ---------------- */

  const renderFailureView = () => (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-xl font-semibold">
        Oops! Something Went Wrong
      </h1>
      <button
        onClick={getTrendingVideos}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        Retry
      </button>
    </div>
  );

  /* ---------------- Success ---------------- */

  const renderSuccessView = () => (
    <div>

      {/* Trending Header */}
      <div className="flex items-center gap-4 bg-gray-100 p-6">
        <div className="bg-red-100 p-4 rounded-full">
          <BsFire className="text-red-500 text-2xl" />
        </div>
        <h1 className="text-2xl font-bold">Trending</h1>
      </div>

      {/* Videos List */}
      <ul className="p-6 space-y-8">
        {trendingVideos.map((video) => (
          <li key={video.id}>
            <Link to={`/videos/${video.id}`}>
              <div className="flex flex-col md:flex-row gap-6">

                {/* Thumbnail */}
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full md:w-[400px] rounded"
                />

                {/* Video Details */}
                <div className="flex flex-col gap-3">
                  <h1 className="text-lg font-medium">
                    {video.title}
                  </h1>
                  <p className="text-gray-600 text-sm">
                    {video.channelName}
                  </p>
                  <p className="text-gray-500 text-sm">
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

  /* ---------------- Switch ---------------- */

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

  return renderView();
};

export default Trending;