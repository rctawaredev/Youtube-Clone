import { createContext, useContext, useState, useEffect } from "react";

const SavedVideosContext = createContext();

export const SavedVideosProvider = ({ children }) => {

  const [savedVideos, setSavedVideos] = useState(() => {
    const storedVideos = localStorage.getItem("savedVideos");
    return storedVideos ? JSON.parse(storedVideos) : [];
  });

  
  useEffect(() => {
    localStorage.setItem("savedVideos", JSON.stringify(savedVideos));
  }, [savedVideos]);

  const toggleSaveVideo = (video) => {
    if (!video) return;

    setSavedVideos((prev) => {
      const isAlreadySaved = prev.find(
        (v) => v.id === video.id
      );

      if (isAlreadySaved) {
        return prev.filter((v) => v.id !== video.id);
      } else {
        return [...prev, video];
      }
    });
  };

  return (
    <SavedVideosContext.Provider
      value={{ savedVideos, toggleSaveVideo }}
    >
      {children}
    </SavedVideosContext.Provider>
  );
};

export const useSavedVideos = () => {
  return useContext(SavedVideosContext);
};