import React from "react";
import "./App.css";
import GridState from "./context/grid/GridState";
import PathfinderVisualizer from "./PathfinderVisualizer/PathfinderVisualizer";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <GridState>
      <div className="App" draggable="false">
        <Navbar />

        <PathfinderVisualizer />
      </div>
    </GridState>
  );
}

export default App;
