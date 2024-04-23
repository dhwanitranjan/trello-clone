import React from "react";
import "./App.css";
import CurrentDateTime from "./components/CurrentDateTime";
import DnD from "./projects/dnd/DnD";

function App() {
  return (
    <div className="position-relative app-container">
      <CurrentDateTime />
      <DnD />
    </div>
  );
}

export default App;
