import React from "react";
import CaptionEditor from "./components/CaptionEditor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="items-center justify-center p-6">
        <CaptionEditor />
      </div>
    </DndProvider>
  );
};

export default App;
