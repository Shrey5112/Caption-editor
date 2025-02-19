import React, { useRef, useEffect, useState } from "react";
import { useCaptionStore } from "../store/useCaptionStore";
import { motion } from "framer-motion";

const VideoPlayer: React.FC<{ videoFile: File | null }> = ({ videoFile }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { captions } = useCaptionStore();
  const [currentCaption, setCurrentCaption] = useState<string>("");
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current) {
        const currentTime = videoRef.current.currentTime;
        const activeCaption = captions.find(
          (caption) => currentTime >= caption.start && currentTime <= caption.end
        );
        setCurrentCaption(activeCaption ? activeCaption.text : "");
      }
    }, 500);

    return () => clearInterval(interval);
  }, [captions]);

  // Function to toggle full screen
  const handleFullscreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Event listener to track fullscreen changes
  useEffect(() => {
    const fullscreenChangeHandler = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", fullscreenChangeHandler);
    return () => document.removeEventListener("fullscreenchange", fullscreenChangeHandler);
  }, []);

  return (
    <div className="relative flex flex-col items-center mt-4">
      {videoFile && (
        <div className="relative w-full max-w-2xl">
          {/* Video Element */}
          <video
            ref={videoRef}
            controls
            className="w-full rounded-lg shadow-lg"
            onDoubleClick={handleFullscreen} // Double-click to toggle full screen
          >
            <source src={URL.createObjectURL(videoFile)} type={videoFile.type} />
          </video>

          {/* Live Caption Overlay (Inside Video) */}
          {currentCaption && (
            <motion.div
              className={`absolute left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white px-4 py-2 rounded-md text-lg text-center max-w-lg ${
                isFullscreen ? "bottom-12" : "bottom-8"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {currentCaption}
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
