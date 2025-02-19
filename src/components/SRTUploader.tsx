import React, { useState, useRef } from "react";
import SRTParser from "srt-parser-2";
import { useCaptionStore } from "../store/useCaptionStore";

const SRTUploader: React.FC = () => {
  const { setCaptions } = useCaptionStore();
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      parseSrtFile(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setFileName(file.name);
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
    <div
      className="border-2 border-dashed border-blue-400 p-6 rounded-lg text-center cursor-pointer bg-gray-100 hover:bg-gray-200"
      onClick={() => fileInputRef.current?.click()}
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
    >
      {fileName ? (
        <p className="font-semibold text-blue-600">{fileName}</p>
      ) : (
        <p className="text-gray-600">Drag & Drop SRT File Here or Click to Choose File</p>
      )}
      <input
        type="file"
        accept=".srt"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileSelect}
      />
    </div>
  );
};

export default SRTUploader;