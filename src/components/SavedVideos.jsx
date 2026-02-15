import { useSavedVideos } from "../context/SavedVideosContext";
import { Link } from "react-router-dom";
import { BsBookmark } from "react-icons/bs";

const SavedVideos = () => {
  const { savedVideos } = useSavedVideos();

  if (savedVideos.length === 0) {
    return (
      <div className="flex flex-col items-center mt-20">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
          alt="no saved"
          className="h-60"
        />
        <h1 className="text-xl font-semibold mt-4">
          No saved videos found
        </h1>
        <p className="text-gray-500 mt-2">
          You can save videos while watching them
        </p>
      </div>
    );
  }

  return (
    <div>

      {/* 🔥 Header like Trending */}
      <div className="flex items-center gap-4 bg-gray-100 p-6">
        <div className="bg-gray-200 p-4 rounded-full">
          <BsBookmark className="text-xl text-gray-700" />
        </div>
        <h1 className="text-2xl font-bold">Saved Videos</h1>
      </div>

      {/* 🔥 Videos List styled like Trending */}
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

                  <p className="text-gray-600 text-sm">
                    {video.channel.name}
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
};

export default SavedVideos;