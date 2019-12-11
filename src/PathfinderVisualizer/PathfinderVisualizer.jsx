import React, { useEffect, useContext } from "react";
import { dijkstra, backtrackRoute } from "../algorithms/dijkstra";
import GridContext from "../context/grid/gridContext";
import "./PathfinderVisualizer.css";
import Vertex from "./Vertex/Vertex";

import {
  createInitialGrid,
  createGridWithWalls
} from "./Initializers/GridInitializers";

import { ROWS, COLUMNS } from "../parameters";

const PathfinderVisualizer = () => {
  const gridContext = useContext(GridContext);

  const {
    grid,
    setGrid,
    setMouseIsPressed,
    start_vertex_row,
    start_vertex_col,
    finish_vertex_row,
    finish_vertex_col,
    mouseIsPressed
  } = gridContext;

  const start_finish = {
    start_vertex_row,
    start_vertex_col,
    finish_vertex_row,
    finish_vertex_col
  };

  useEffect(() => {
    console.log("setting up the grid");
    setGrid(createInitialGrid(start_finish));
  }, []);
  //   [...Object.values(gridContext), start_finish]
  //   componentDidMount() {
  //     const grid = createInitialGrid(this.state.start_finish_coordinates);
  //     this.setState({ grid });
  //   }
  const handleMouseDown = position => {
    const { row, col } = position;
    if (
      (row === start_vertex_row && col === start_vertex_col) ||
      (row === finish_vertex_row && col === finish_vertex_col)
    ) {
      console.log("activate the drag action");
    } else {
      if (!grid[row][col].isStart && !grid[row][col].isFinish) {
        const wallGrid = createGridWithWalls(grid, position);
        setGrid(wallGrid);
        setMouseIsPressed(true);
      }
    }
  };

  const handleMouseEnter = position => {
    const { row, col } = position;
    if (!mouseIsPressed) return;
    if (!grid[row][col].isStart && !grid[row][col].isFinish) {
      const wallGrid = createGridWithWalls(grid, position);
      setGrid(wallGrid);
    }
  };
  const handleMouseUp = position => {
    setMouseIsPressed(false);
  };

  const resetGrid = () => {
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLUMNS; col++) {
        if (grid[row][col].isWall)
          document.getElementById(`vertex-${row}-${col}`).className = "vertex";
        if (
          grid[row][col].isVisited &&
          !(grid[row][col].isFinish || grid[row][col].isStart)
        )
          document.getElementById(`vertex-${row}-${col}`).className = "vertex";
        if (grid[row][col].isStart)
          document.getElementById(`vertex-${row}-${col}`).className =
            "vertex vertex-start";
        if (grid[row][col].isFinish)
          document.getElementById(`vertex-${row}-${col}`).className =
            "vertex vertex-finish";
      }
    }
    const resetGrid = createInitialGrid(start_finish);
    setGrid(resetGrid);
  };

  const animateShortestPath = backtrackRoute => {
    console.log(backtrackRoute);
    for (let i = 0; i < backtrackRoute.length; i++) {
      setTimeout(() => {
        const vertex = backtrackRoute[i];
        document.getElementById(
          `vertex-${vertex.position.row}-${vertex.position.col}`
        ).className = "vertex vertex-shortest-path";
      }, 40 * i);
    }
    document.getElementById("btnStart").disabled = false;
    document.getElementById("btnReset").disabled = false;
  };

  const animateAlgorithm = (visitedInOrder, backtrackedVertices) => {
    for (let i = 0; i <= visitedInOrder.length; i++) {
      if (i === visitedInOrder.length) {
        setTimeout(() => {
          animateShortestPath(backtrackedVertices);
        }, 40 * i);
        console.log("done2");
        return;
      }
      setTimeout(() => {
        const row = visitedInOrder[i].position.row;
        const col = visitedInOrder[i].position.col;
        const isStart = visitedInOrder[i].isStart;
        const isFinish = visitedInOrder[i].isFinish;

        if (!(isStart || isFinish))
          document.getElementById(`vertex-${row}-${col}`).className =
            "vertex vertex-visited";
      }, 40 * i);
    }
  };

  function visualizeAlgorithm() {
    document.getElementById("btnStart").disabled = true;
    document.getElementById("btnReset").disabled = true;
    console.log(grid);
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLUMNS; col++) {
        if (
          grid[row][col].isVisited &&
          !(grid[row][col].isFinish || grid[row][col].isStart)
        )
          document.getElementById(`vertex-${row}-${col}`).className = "vertex";
        if (grid[row][col].isStart)
          document.getElementById(`vertex-${row}-${col}`).className =
            "vertex vertex-start";
        if (grid[row][col].isFinish)
          document.getElementById(`vertex-${row}-${col}`).className =
            "vertex vertex-finish";
        if (grid[row][col].isWall)
          document.getElementById(`vertex-${row}-${col}`).className =
            "vertex vertex-wall";
      }
    }

    const startVertex = grid[start_vertex_row][start_vertex_col];
    const finishVertex = grid[finish_vertex_row][finish_vertex_col];
    const visitedInOrder = dijkstra(grid, startVertex, finishVertex);
    const backtrackedVertices = backtrackRoute(finishVertex);
    console.log("backtracked vertices: ", backtrackedVertices);
    animateAlgorithm(visitedInOrder, backtrackedVertices);
  }

  return (
    <>
      <div>
        {" "}
        <button
          id="btnStart"
          className="start"
          onClick={() => visualizeAlgorithm()}
        >
          Start
        </button>
        <button id="btnReset" className="reset" onClick={() => resetGrid()}>
          Reset Grid
        </button>
      </div>

      <table className="grid">
        <tbody className="grid">
          {grid.map((row, row_index) => {
            return (
              <tr className="row" key={row_index}>
                {row.map((vertex, vertex_index) => {
                  const {
                    position,
                    isFinish,
                    isStart,
                    isWall,
                    distance,
                    isVisited,
                    isPath
                  } = vertex;
                  return (
                    <Vertex
                      key={vertex_index}
                      position={position}
                      isFinish={isFinish}
                      isStart={isStart}
                      onMouseDown={position => handleMouseDown(position)}
                      onMouseEnter={position => handleMouseEnter(position)}
                      onMouseUp={position => handleMouseUp(position)}
                      mouseIsPressed={mouseIsPressed}
                      isWall={isWall}
                      distance={distance}
                      isVisited={isVisited}
                      isPath={isPath}
                    ></Vertex>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default PathfinderVisualizer;
