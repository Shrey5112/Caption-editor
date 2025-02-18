// App.tsx
import React from "react";
import CaptionEditor from "./components/CaptionEditor";

const App: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-6">
      <CaptionEditor />
    </div>
  );
};

export default App;
