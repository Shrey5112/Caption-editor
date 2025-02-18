// SRTUploader.tsx
import React from "react";
import SRTParser from "srt-parser-2";
import { useCaptionStore } from "../store/useCaptionStore";

const SRTUploader: React.FC = () => {
  const { setCaptions } = useCaptionStore();

  const handleSrtUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      parseSrtFile(file);
    }
  };

  const parseSrtFile = async (file: File) => {
    const text = await file.text();
    const parser = new SRTParser();
    const parsedCaptions = parser.fromSrt(text).map((caption) => ({
      start: caption.startSeconds,
      end: caption.endSeconds,
      text: caption.text,
    }));
    setCaptions(parsedCaptions);
  };

  return (
    <div className="mt-4 flex justify-center">
      <input type="file" accept=".srt" onChange={handleSrtUpload} className="file:bg-blue-500 file:text-white file:px-4 file:py-2 file:rounded-lg file:border-none cursor-pointer" />
    </div>
  );
};


export default SRTUploader;