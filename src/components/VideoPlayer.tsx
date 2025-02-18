// VideoPlayer.tsx
import React, { useRef, useEffect, useState } from "react";
import { useCaptionStore } from "../store/useCaptionStore";

const VideoPlayer: React.FC<{ videoFile: File | null }> = ({ videoFile }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { captions } = useCaptionStore();
  const [currentCaption, setCurrentCaption] = useState<string>("");

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

  return (
    <div className="flex flex-col items-center mt-4">
      {videoFile && (
        <video ref={videoRef} controls className="w-full max-w-2xl rounded-lg shadow-lg">
          <source src={URL.createObjectURL(videoFile)} type={videoFile.type} />
        </video>
      )}
      <div className="mt-4 text-center bg-black text-white p-2 rounded-lg w-full max-w-xl text-lg">
        {currentCaption}
      </div>
    </div>
  );
};

export default VideoPlayer;


