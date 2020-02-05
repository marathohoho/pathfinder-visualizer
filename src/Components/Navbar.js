import React, { useContext } from "react";
import "./navbar.scss";
import { resetGrid } from "../PathfinderVisualizer/Initializers/GridReset";
import GridContext from "../context/grid/gridContext";
import { dijkstra, backtrackRoute } from "../algorithms/dijkstra";
import { astar } from "../algorithms/astar";
import { animateAlgorithm } from "../PathfinderVisualizer/Visualizers/Visualize";
import { bfs_dfs } from "../algorithms/bfs_dfs";
import { ROWS, COLUMNS } from "../parameters";

function Navbar() {
  const gridContext = useContext(GridContext);

  const {
    grid,
    setGrid,

    start_vertex_row,
    start_vertex_col,
    finish_vertex_row,
    finish_vertex_col,

    distanceMethod,
    allowDiagonal,

    algorithm
  } = gridContext;

  const start_finish = {
    start_vertex_row,
    start_vertex_col,
    finish_vertex_row,
    finish_vertex_col
  };

  const clearTheVisualOfVertex = () => {
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLUMNS; col++) {
        let thisVertex = grid[row][col];
        if (thisVertex.isStart)
          document.getElementById(`vertex-${row}-${col}`).className =
            "vertex vertex-start";
        else if (thisVertex.isFinish)
          document.getElementById(`vertex-${row}-${col}`).className =
            "vertex vertex-finish";
        else if (thisVertex.isWall)
          document.getElementById(`vertex-${row}-${col}`).className =
            "vertex vertex-wall vertex-non-draggable";
        else {
          document.getElementById(`vertex-${row}-${col}`).className = "vertex ";
        }
      }
    }
  };

  const visualizeAlgorithm = () => {
    clearTheVisualOfVertex();
    document.getElementById("root").style = "pointer-events: none";
    document.getElementById("btnStart").disabled = true;
    document.getElementById("btnReset").disabled = true;
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLUMNS; col++) {
        let thisVertex = grid[row][col];

        if (thisVertex.isStart)
          document.getElementById(`vertex-${row}-${col}`).className =
            "vertex vertex-start";
        else if (thisVertex.isFinish)
          document.getElementById(`vertex-${row}-${col}`).className =
            "vertex vertex-finish";
        else if (thisVertex.isWall)
          document.getElementById(`vertex-${row}-${col}`).className =
            "vertex vertex-wall";
        else if (thisVertex.isVisited)
          document.getElementById(`vertex-${row}-${col}`).className = "vertex";
      }
    }
    const startVertex = grid[start_vertex_row][start_vertex_col];
    const finishVertex = grid[finish_vertex_row][finish_vertex_col];
    let visitedInOrder;

    switch (algorithm) {
      case "astar":
        visitedInOrder = astar(grid, startVertex, finishVertex);
        break;
      case "dijkstra":
        visitedInOrder = dijkstra(
          grid,
          startVertex,
          finishVertex,
          distanceMethod,
          allowDiagonal
        );
        break;
      case "dfs":
        visitedInOrder = bfs_dfs(grid, startVertex, finishVertex, "dfs");
        break;
      case "bfs":
        visitedInOrder = bfs_dfs(grid, startVertex, finishVertex, "bfs");
        break;
      default:
        visitedInOrder = dijkstra(
          grid,
          startVertex,
          finishVertex,
          distanceMethod,
          allowDiagonal
        );
    }
    // console.log(grid);
    // console.log(visitedInOrder);
    const backtrackedVertices = backtrackRoute(finishVertex, startVertex);
    animateAlgorithm(visitedInOrder, backtrackedVertices);
  };

  return (
    <div className="container">
      <h2>Pathfinder Algorithms Visualization</h2>

      <nav className="main-nav">
        <div className="algorithms-methods">
          <h1>something</h1>
        </div>
        <div className="buttons">
          <div>
            {" "}
            <button
              id="btnStart"
              className="btn"
              onClick={() => visualizeAlgorithm()}
            >
              Start
            </button>
            <button
              id="btnReset"
              className="btn"
              onClick={() => resetGrid(grid, setGrid, start_finish)}
            >
              Reset Grid
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
