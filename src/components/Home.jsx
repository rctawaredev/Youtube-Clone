import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { FaSearch } from "react-icons/fa";

const apiStatusConstants = {
  INITIAL: "INITIAL",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

const Home = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL);
  const [videoDetails, setVideoDetails] = useState([]);
  const [showBanner, setShowBanner] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const getVideoDetails = async () => {
    setApiStatus(apiStatusConstants.IN_PROGRESS);

    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = `https://apis.ccbp.in/videos?search=${searchValue}`;

    try {
      const response = await fetch(apiUrl, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });

      if (response.ok) {
        const data = await response.json();
        const updatedVideos = data.videos.map((eachVideo) => ({
          id: eachVideo.id,
          title: eachVideo.title,
          thumbnailUrl: eachVideo.thumbnail_url,
          viewCount: eachVideo.view_count,
          publishedAt: eachVideo.published_at,
          channel: {
            name: eachVideo.channel.name,
            profileImageUrl: eachVideo.channel.profile_image_url,
          },
        }));

        setVideoDetails(updatedVideos);
        setApiStatus(apiStatusConstants.SUCCESS);
      } else {
        setApiStatus(apiStatusConstants.FAILURE);
      }
    } catch {
      setApiStatus(apiStatusConstants.FAILURE);
    }
  };

  useEffect(() => {
    getVideoDetails();
  }, []);

  /* ---------------- Banner ---------------- */

  const renderBanner = () =>
    showBanner && (
      <div className="bg-[url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png')] bg-cover w-full p-6">
        <div className="flex justify-between items-center">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            className="h-6"
            alt="banner logo"
          />
          <RxCross2
            className="text-2xl cursor-pointer"
            onClick={() => setShowBanner(false)}
          />
        </div>

        <h1 className="mt-4 md:text-lg w-2/3">
          Buy Nxt Watch Premium prepaid plans with UPI
        </h1>

        <button className="mt-4 border px-4 py-1 rounded hover:bg-red-500 hover:text-white transition">
          GET IT NOW
        </button>
      </div>
    );

  /* ---------------- Search ---------------- */

  const renderSearch = () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        getVideoDetails();
      }}
      className="flex items-center w-[95%] md:w-96 lg:w-125 
                 mx-4 my-6 bg-white border border-gray-300 
                 rounded-lg shadow-sm focus-within:ring-2 
                 focus-within:ring-red-500"
    >
      <input
        type="search"
        placeholder="Search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="flex-1 px-4 py-2 outline-none"
      />

      <button
        type="submit"
        className="px-4 h-10 py-2 bg-gray-100 hover:bg-red-500 
                   hover:text-white rounded-r-lg transition"
      >
        <FaSearch />
      </button>
    </form>
  );

  /* ---------------- Success View ---------------- */

  const renderSuccessView = () => (
    <>
      {renderSearch()}

      {videoDetails.length === 0 ? (
        <div className="flex flex-col items-center mt-10">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
            alt="no results"
            className="h-40"
          />
          <h1 className="text-lg font-semibold mt-4">
            No Search Results Found
          </h1>
          <p className="text-gray-500 text-sm mt-2 text-center">
            Try different keywords or remove search filter
          </p>
          <button
            onClick={getVideoDetails}
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
          >
            Retry
          </button>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-10">
          {videoDetails.map((eachVideo) => (
            <li key={eachVideo.id}>
              <Link to={`/videos/${eachVideo.id}`}>
                <img
                  src={eachVideo.thumbnailUrl}
                  alt={eachVideo.title}
                  className="w-full h-44 object-cover rounded"
                />

                <div className="flex gap-3 mt-3">
                  <img
                    src={eachVideo.channel.profileImageUrl}
                    alt={eachVideo.channel.name}
                    className="h-8 w-8 rounded-full"
                  />

                  <div>
                    <p className="text-sm font-medium line-clamp-2">
                      {eachVideo.title}
                    </p>

                    <p className="text-sm text-gray-500">
                      {eachVideo.channel.name}
                    </p>

                    <div className="flex gap-3 text-xs text-gray-500">
                      <span>{eachVideo.viewCount} views</span>
                      <span>{eachVideo.publishedAt}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );

  /* ---------------- Loading ---------------- */

  const renderLoadingView = () => (
    <div className="flex justify-center items-center h-64">
      <BeatLoader color="#ef4444" />
    </div>
  );

  /* ---------------- Failure ---------------- */

  const renderFailureView = () => (
    <div className="flex flex-col items-center mt-10">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure"
        className="h-60"
      />

      <h1 className="text-lg font-semibold mt-4">Oops! Something Went Wrong</h1>

      <p className="text-gray-500 mt-2 text-center">
        We are having some trouble completing your request.
      </p>

      <button
        onClick={getVideoDetails}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        Retry
      </button>
    </div>
  );

  /* ---------------- Switch View ---------------- */

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
    <>
      {renderBanner()}
      {renderView()}
    </>
  );
};

export default Home;
