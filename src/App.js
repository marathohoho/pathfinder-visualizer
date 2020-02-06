import React from "react";
import "./App.scss";
import GridState from "./context/grid/GridState";
import PathfinderVisualizer from "./PathfinderVisualizer/PathfinderVisualizer";
import Navbar from "./Components/Navbar";
import { Dialog } from "./Components/Dialog";
function App() {
  return (
    <GridState>
      <div className="App" draggable="false">
        <Navbar />
        <PathfinderVisualizer />
        <Dialog />
      </div>
    </GridState>
  );
}

export default App;
