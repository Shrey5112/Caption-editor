import React, { useState, useRef } from "react";

interface VideoUploaderProps {
  onVideoUpload: (file: File) => void;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ onVideoUpload }) => {
  const [videoName, setVideoName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoName(file.name);
      onVideoUpload(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setVideoName(file.name);
      onVideoUpload(file);
    }
  };

  return (
    <div
      className="border-2 border-dashed border-gray-400 p-6 rounded-lg text-center cursor-pointer bg-gray-100 hover:bg-gray-200"
      onClick={() => fileInputRef.current?.click()}
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
    >
      {videoName ? (
        <p className="font-semibold text-green-600">{videoName}</p>
      ) : (
        <p className="text-gray-600">Drag & Drop Video Here or Click to Choose File</p>
      )}
      <input
        type="file"
        accept=".mp4,.mov,.webm"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileSelect}
      />
    </div>
  );
};

export default VideoUploader;
