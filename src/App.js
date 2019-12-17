import React from "react";
import "./App.css";
import GridState from "./context/grid/GridState";
import PathfinderVisualizer from "./PathfinderVisualizer/PathfinderVisualizer";
import Particles from "react-particles-js";
import particlesjsconfig from "./utilities/particlesjs-config.json";

function App() {
  return (
    <GridState>
      <div className="App" draggable="false">
        <h1>Pathfinder visualization</h1>
        <PathfinderVisualizer />
      </div>
      <Particles className="particles" params={particlesjsconfig} />
    </GridState>
  );
}

export default App;
