import React from "react";
import "./App.css";
import PathfinderVisualizer from "./PathfinderVisualizer/PathfinderVisualizer";

function App() {
  return (
    <div className="App">
      <h1>Pathfinder visualization</h1>
      <PathfinderVisualizer>ts</PathfinderVisualizer>
    </div>
  );
}

export default App;
