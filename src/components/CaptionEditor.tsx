import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import SRTUploader from "./SRTUploader";
import { useCaptionStore } from "../store/useCaptionStore";

const CaptionEditor: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const { captions, updateCaption } = useCaptionStore();

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secondsFormatted = Math.floor(seconds % 60);
    return `${minutes}:${secondsFormatted.toString().padStart(2, "0")}`;
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Caption Editor</h2>
      <div className="flex gap-8">
        {/* Left Column (Video Player, Upload, and Live Caption) */}
        <div className="flex-1 flex flex-col items-center gap-4">
          <input
            type="file"
            accept=".mp4,.mov,.webm"
            onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
            className="file:bg-green-500 file:text-white file:px-4 file:py-2 file:rounded-lg file:border-none cursor-pointer"
          />
          <VideoPlayer videoFile={videoFile} />
        </div>

        {/* Right Column (SRT Upload and Edit Captions) */}
        <div className="flex-1">
          <div className="w-full max-w-2xl">
            <SRTUploader />
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Edit Captions</h3>
              <ul className="space-y-2 max-h-[500px] overflow-y-auto">
                {captions.map((caption, index) => (
                  <li key={index} className="flex items-center gap-2 bg-white p-2 rounded-lg shadow">
                    <span className="text-sm font-mono">
                      {formatTime(caption.start)}{" "}
                    </span>
                    <input
                      type="text"
                      value={caption.text}
                      onChange={(e) => updateCaption(index, e.target.value)}
                      className="flex-grow p-1 border rounded-lg"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptionEditor;
