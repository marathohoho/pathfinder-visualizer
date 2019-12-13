import React, { useEffect, useContext } from "react";

import GridContext from "../context/grid/gridContext";
import "./PathfinderVisualizer.css";
import Vertex from "./Vertex/Vertex";

import {
  createInitialGrid,
  createGridWithWalls,
  swapVertices,
  updateGrid
} from "./Initializers/GridInitializers";
import { dijkstra, backtrackRoute } from "../algorithms/dijkstra";
import { resetGrid } from "../PathfinderVisualizer/Initializers/GridReset";
import { animateAlgorithm } from "./Visualizers/Visualize";

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
    mouseIsPressed,
    setStart,
    setFinish
  } = gridContext;

  const start_finish = {
    start_vertex_row,
    start_vertex_col,
    finish_vertex_row,
    finish_vertex_col
  };

  useEffect(() => {
    // eslint-disable-next-line
    setGrid(createInitialGrid(start_finish));
  }, []);

  const handleDragStart = (event, position, vertex) => {
    const { row, col } = position;

    if (
      !(row === start_vertex_row && col === start_vertex_col) &&
      !(row === finish_vertex_row && col === finish_vertex_col)
    ) {
      return;
    } else {
      const vertexData = JSON.stringify(vertex);
      event.dataTransfer.setData("vertex_data", vertexData);
    }

    return;
  };
  const handleDragOver = event => {
    event.preventDefault();
  };

  const handleDrop = (event, new_position) => {
    const vertex = JSON.parse(event.dataTransfer.getData("vertex_data"));
    if (vertex.isStart || vertex.isFinish) {
      if (
        (new_position.row === finish_vertex_row &&
          new_position.col === finish_vertex_col) ||
        (new_position.row === start_vertex_row &&
          new_position.col === start_vertex_col)
      )
        return;
    }
    // reassign the start or finish vertex depending on the vertex.isFinish \\ vertex.isStart
    if (vertex.isStart) {
      setStart(new_position);
    } else {
      setFinish(new_position);
    }
    setGrid(swapVertices(grid, vertex, new_position));
    setGrid(updateGrid(grid));
    clearTheVisualOfVertex();
    event.dataTransfer.clearData();
  };

  const handleDrag = position => {
    return;
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

  const handleMouseDown = position => {
    const { row, col } = position;

    if (!grid[row][col].isStart && !grid[row][col].isFinish) {
      const wallGrid = createGridWithWalls(grid, position);
      setGrid(wallGrid);
      updateGrid(wallGrid);
      setMouseIsPressed(true);
      clearTheVisualOfVertex();
    }
  };

  const handleMouseEnter = position => {
    const { row, col } = position;
    if (!mouseIsPressed) return;
    if (!grid[row][col].isStart && !grid[row][col].isFinish) {
      const wallGrid = createGridWithWalls(grid, position);
      setGrid(wallGrid);
      updateGrid(wallGrid);
      clearTheVisualOfVertex();
    }
  };
  const handleMouseUp = position => {
    setMouseIsPressed(false);
  };

  const visualizeAlgorithm = () => {
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
    const visitedInOrder = dijkstra(grid, startVertex, finishVertex);
    const backtrackedVertices = backtrackRoute(finishVertex, startVertex);
    animateAlgorithm(visitedInOrder, backtrackedVertices);
  };

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
        <button
          id="btnReset"
          className="reset"
          onClick={() => resetGrid(grid, setGrid, start_finish)}
        >
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
                      onDragStart={e => handleDragStart(e, position, vertex)}
                      onDragOver={handleDragOver}
                      onDrop={event => handleDrop(event, position)}
                      onDrag={handleDrag}
                      mouseIsPressed={mouseIsPressed}
                      isWall={isWall}
                      distance={distance}
                      isVisited={isVisited}
                      isPath={isPath}
                      draggable={isStart || isFinish}
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
