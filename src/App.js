import React from "react";
import "./App.scss";
import GridState from "./context/grid/GridState";
import PathfinderVisualizer from "./PathfinderVisualizer/PathfinderVisualizer";
import Navbar from "./Components/Navbar";
import { Dialog } from "./Components/Dialog";
import { MobileRoute } from "./Components/MobileRoute";
function App() {
  return (
    <GridState>
      <div className="App" draggable="false">
        <span id="forkongithub">
          <a href="https://github.com/marathohoho/pathfinder-visualizer">
            Fork me on GitHub
          </a>
        </span>
        <Navbar />
        <PathfinderVisualizer />
        {window.innerWidth > 511 ? <Dialog /> : <MobileRoute />}
      </div>
    </GridState>
  );
}

export default App;
