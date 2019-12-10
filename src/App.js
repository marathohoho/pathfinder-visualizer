import React from "react";
import "./App.css";
import GridState from "./context/grid/GridState";
import PathfinderVisualizer from "./PathfinderVisualizer/PathfinderVisualizer";

function App() {
  return (
    <GridState>
      <div className="App">
        <h1>Pathfinder visualization</h1>
        <PathfinderVisualizer />
      </div>
    </GridState>
  );
}

export default App;
