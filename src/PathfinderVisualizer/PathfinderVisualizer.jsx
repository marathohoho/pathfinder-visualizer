import React, { useEffect, useContext } from "react";
import GridContext from "../context/grid/gridContext";
import "./PathfinderVisualizer.css";
import Vertex from "./Vertex/Vertex";
import DistancePicker from "../Components/Methods";
import GridAnnotaion from "../Components/GridAnnotation";
import {
  createInitialGrid,
  createGridWithWalls,
  swapVertices,
  updateGrid
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
    mouseIsPressed,
    setStart,
    setFinish,
    setDistanceMethod,
    setAllowDiagonal,
    setAlgorithm,
    algorithm
  } = gridContext;

  const start_finish = {
    start_vertex_row,
    start_vertex_col,
    finish_vertex_row,
    finish_vertex_col
  };

  useEffect(() => {
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
  const handleDragOver = (event, position) => {
    event.preventDefault();
    event.stopPropagation();
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

  const handleMouseDown = (event, position) => {
    const { row, col } = position;
    let settingWall = true;
    let settingWeight = false;
    if (event.ctrlKey) {
      //place a weight when ctrl is pressed
      if (
        !grid[row][col].isStart &&
        !grid[row][col].isFinish &&
        algorithm === "dijkstra"
      ) {
        settingWall = false;
        settingWeight = true;
        const weightGrid = createGridWithWalls(
          grid,
          position,
          settingWall,
          settingWeight
        );
        setGrid(weightGrid);
        updateGrid(weightGrid);
        setMouseIsPressed(true);
      }
    }
    if (!grid[row][col].isStart && !grid[row][col].isFinish) {
      const wallGrid = createGridWithWalls(
        grid,
        position,
        settingWall,
        settingWeight
      );
      setGrid(wallGrid);
      updateGrid(wallGrid);
      setMouseIsPressed(true);
    }
  };

  const handleMouseEnter = (event, position) => {
    if (!mouseIsPressed) return;
    let settingWall = true;
    let settingWeight = false;
    const { row, col } = position;
    if (event.ctrlKey) {
      //place a weight when ctrl is pressed
      if (
        !grid[row][col].isStart &&
        !grid[row][col].isFinish &&
        algorithm === "dijkstra"
      ) {
        settingWall = false;
        settingWeight = true;
        const weightGrid = createGridWithWalls(
          grid,
          position,
          settingWall,
          settingWeight
        );
        setGrid(weightGrid);
        updateGrid(weightGrid);
      }
    }

    if (!grid[row][col].isStart && !grid[row][col].isFinish) {
      const wallGrid = createGridWithWalls(
        grid,
        position,
        settingWall,
        settingWeight
      );
      setGrid(wallGrid);
      updateGrid(wallGrid);
    }
  };
  const handleMouseUp = position => {
    setMouseIsPressed(false);
  };

  const chooseDiagonalMethod = event => {
    setAllowDiagonal(event);
    setGrid(updateGrid(grid));
    clearTheVisualOfVertex();
  };

  const chooseDistanceMethod = event => {
    setGrid(updateGrid(grid));
    clearTheVisualOfVertex();
    setDistanceMethod(event);
  };
  const chooseAlgorithm = event => {
    setGrid(updateGrid(grid));
    clearTheVisualOfVertex();
    setAlgorithm(event);
  };

  //   const createMaze = () => {
  //     setGrid(mazeGenerator(grid));
  //     updateGrid(grid);
  //   };
  return (
    <div id="disable-div">
      <DistancePicker
        getWhichAlgorithm={chooseAlgorithm}
        getDistanceMethod={chooseDistanceMethod}
        chooseDiagonal={chooseDiagonalMethod}
      />
      <GridAnnotaion algorithm={algorithm} />
      <table className="grid" draggable="false" id="table">
        <tbody className="grid" draggable="false">
          {grid.map((row, row_index) => {
            return (
              <tr className="row" key={row_index}>
                {row.map((vertex, vertex_index) => {
                  const {
                    position,
                    isFinish,
                    isStart,
                    isWall,
                    isVisited,
                    isPath,
                    distance,
                    weight
                  } = vertex;
                  return (
                    <Vertex
                      key={vertex_index}
                      position={position}
                      isFinish={isFinish}
                      isStart={isStart}
                      weight={weight}
                      onMouseDown={event => handleMouseDown(event, position)}
                      onMouseEnter={event => handleMouseEnter(event, position)}
                      onMouseUp={position => handleMouseUp(position)}
                      onDragStart={e => handleDragStart(e, position, vertex)}
                      onDragOver={event => handleDragOver(event, position)}
                      onDrop={event => handleDrop(event, position)}
                      onDrag={handleDrag}
                      mouseIsPressed={mouseIsPressed}
                      isWall={isWall}
                      distance={distance}
                      isVisited={isVisited}
                      isPath={isPath}
                      draggable={(isStart || isFinish) && !isWall}
                    ></Vertex>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PathfinderVisualizer;
