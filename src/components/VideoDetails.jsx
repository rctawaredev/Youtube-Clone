import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import ReactPlayer from "react-player";
import { BeatLoader } from "react-spinners";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { MdPlaylistAdd } from "react-icons/md";
import { useSavedVideos } from "../context/SavedVideosContext";
import { useTheme } from "../context/ThemeContext";

const apiStatusConstants = {
  INITIAL: "INITIAL",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

const VideoDetails = () => {
  const { id } = useParams();
  const { darkMode } = useTheme();

  const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL);
  const [videoData, setVideoData] = useState(null);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const { savedVideos, toggleSaveVideo } = useSavedVideos();

  const getVideoDetails = async () => {
    setApiStatus(apiStatusConstants.IN_PROGRESS);
    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = `https://apis.ccbp.in/videos/${id}`;

    try {
      const response = await fetch(apiUrl, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });

      if (response.ok) {
        const data = await response.json();
        const video = data.video_details;

        const updatedVideo = {
          id: video.id,
          title: video.title,
          videoUrl: video.video_url,
          viewCount: video.view_count,
          publishedAt: video.published_at,
          description: video.description,
          thumbnailUrl: video.thumbnail_url,
          channel: {
            name: video.channel.name,
            profileImageUrl: video.channel.profile_image_url,
            subscriberCount: video.channel.subscriber_count,
          },
        };

        setVideoData(updatedVideo);
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
  }, [id]);

  const renderLoadingView = () => (
    <div className={`flex justify-center items-center h-64 ${darkMode ? "bg-black" : ""}`}>
      <BeatLoader color="#ef4444" />
    </div>
  );

  const renderFailureView = () => (
    <div className={`flex flex-col items-center mt-20 ${darkMode ? "bg-black text-white min-h-screen" : ""}`}>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure"
        className="h-60"
      />
      <h1 className="text-xl font-semibold">Oops! Something Went Wrong</h1>
      <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} mt-2`}>
        We are having trouble fetching this video.
      </p>
      <button
        onClick={getVideoDetails}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        Retry
      </button>
    </div>
  );

  const renderSuccessView = () => {
    const isSaved = savedVideos.find((video) => video.id === videoData.id);

    return (
      <div className={`p-6 pb-30 ${darkMode ? "bg-black text-white min-h-screen" : ""}`}>
        <ReactPlayer
          src={videoData.videoUrl}
          controls
          width="100%"
          height="50vh"
        />

        <h1 className="text-lg pt-5 font-semibold">{videoData.title}</h1>

        <div className={`flex flex-col md:flex-row md:items-center md:justify-between mt-3 border-b pb-4 ${darkMode ? "border-slate-200" : ""}`}>
          <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-sm`}>
            {videoData.viewCount} views • {videoData.publishedAt}
          </p>

          <div className="flex gap-6 mt-3 md:mt-0 text-sm">
            <button
              onClick={() => {
                setLiked(!liked);
                setDisliked(false);
              }}
              className={`flex items-center gap-1 ${
                liked ? "text-blue-500" : darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <AiOutlineLike /> Like
            </button>

            <button
              onClick={() => {
                setDisliked(!disliked);
                setLiked(false);
              }}
              className={`flex items-center gap-1 ${
                disliked ? "text-blue-500" : darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <AiOutlineDislike /> Dislike
            </button>

            <button
              onClick={() => toggleSaveVideo(videoData)}
              className={`flex items-center gap-1 ${
                isSaved ? "text-blue-500" : darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <MdPlaylistAdd />
              {isSaved ? "Saved" : "Save"}
            </button>
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <img
            src={videoData.channel.profileImageUrl}
            alt={videoData.channel.name}
            className="h-10 w-10 rounded-full"
          />
          <div>
            <p className="font-medium">{videoData.channel.name}</p>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-sm`}>
              {videoData.channel.subscriberCount} Subscribers
            </p>
            <p className="text-sm mt-3">{videoData.description}</p>
          </div>
        </div>
      </div>
    );
  };

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

export default VideoDetails;