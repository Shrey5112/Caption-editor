import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import SRTUploader from "./SRTUploader";
import VideoUploader from "./VideoUploader";
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
    <div className="container mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-2xl transition-all">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
        Caption Editor
      </h2>
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column (Video Player & Upload) */}
        <div className="flex-1 flex flex-col items-center gap-4 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
          <VideoUploader onVideoUpload={setVideoFile} />
          <VideoPlayer videoFile={videoFile} />
        </div>

        {/* Right Column (SRT Upload & Edit Captions) */}
        <div className="flex-1 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
          <SRTUploader />
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">Edit Captions</h3>
            <ul className="space-y-3 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600">
              {captions.map((caption, index) => (
                <li key={index} className="flex items-center gap-2 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm hover:shadow-md transition">
                  <span className="text-sm font-mono text-gray-600 dark:text-gray-300">
                    {formatTime(caption.start)}
                  </span>
                  <input
                    type="text"
                    value={caption.text}
                    onChange={(e) => updateCaption(index, e.target.value)}
                    className="flex-grow p-2 border rounded-lg text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-600 focus:ring focus:ring-blue-400 outline-none"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptionEditor;