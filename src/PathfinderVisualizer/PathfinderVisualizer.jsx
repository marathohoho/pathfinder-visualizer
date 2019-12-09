import React, { Component } from "react";

import { dijkstra, backtrackRoute } from "../algorithms/dijkstra";
import {
  createInitialGrid,
  createGridWithWalls
} from "./Initializers/GridInitializers";
import {
  ROWS,
  COLUMNS,
  START_VERTEX_ROW,
  START_VERTEX_COL,
  FINISH_VERTEX_ROW,
  FINISH_VERTEX_COL
} from "../parameters";
import "./PathfinderVisualizer.css";
import Vertex from "./Vertex/Vertex";

export default class PathfinderVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      isDragging: false,

      originalX: 0,
      originalY: 0,

      translateX: 0,
      translateY: 0,

      lastTranslateX: 0,
      lastTranslateY: 0
    };
  }
  componentDidMount() {
    const grid = createInitialGrid();
    this.setState({ grid });
  }

  handleMouseDown = position => {
    if (!this.state.grid[position.row][position.col].isStart) {
      const grid = createInitialGrid();
      this.setState({ grid });
      if (
        !this.state.grid[position.row][position.col].isStart &&
        !this.state.grid[position.row][position.col].isFinish
      ) {
        const wallGrid = createGridWithWalls(this.state.grid, position);
        this.setState({ grid: wallGrid, mouseIsPressed: true });
        console.log("Updated grid after wall added: ", this.state.grid);
      }
    }
  };

  handleMouseEnter = position => {
    if (!this.state.mouseIsPressed) return;
    if (
      !this.state.grid[position.row][position.col].isStart &&
      !this.state.grid[position.row][position.col].isFinish
    ) {
      const wallGrid = createGridWithWalls(this.state.grid, position);
      this.setState({ grid: wallGrid });
    }
  };
  handleMouseUp = position => {
    this.setState({ mouseIsPressed: false });
  };

  resetGrid = () => {
    const { grid } = this.state;
    console.log(grid);
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
    const resetGrid = createInitialGrid();
    this.setState({ grid: resetGrid });
  };

  animateShortestPath = backtrackRoute => {
    console.log(backtrackRoute);
    for (let i = 0; i < backtrackRoute.length; i++) {
      setTimeout(() => {
        const vertex = backtrackRoute[i];
        document.getElementById(
          `vertex-${vertex.position.row}-${vertex.position.col}`
        ).className = "vertex vertex-shortest-path";
      }, 40 * i);
    }
    console.log("done1");
    document.getElementById("btnStart").disabled = false;
    document.getElementById("btnReset").disabled = false;
  };

  animateAlgorithm = (visitedInOrder, backtrackedVertices) => {
    for (let i = 0; i <= visitedInOrder.length; i++) {
      if (i === visitedInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(backtrackedVertices);
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

  visualizeAlgorithm() {
    document.getElementById("btnStart").disabled = true;
    document.getElementById("btnReset").disabled = true;
    const { grid } = this.state;
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
    const startVertex = grid[START_VERTEX_ROW][START_VERTEX_COL];
    const finishVertex = grid[FINISH_VERTEX_ROW][FINISH_VERTEX_COL];
    const visitedInOrder = dijkstra(grid, startVertex, finishVertex);
    const backtrackedVertices = backtrackRoute(finishVertex);
    console.log("backtracked vertices: ", backtrackedVertices);
    this.animateAlgorithm(visitedInOrder, backtrackedVertices);
  }
  render() {
    const { grid, mouseIsPressed } = this.state;
    return (
      <>
        <div>
          {" "}
          <button
            id="btnStart"
            className="start"
            onClick={() => this.visualizeAlgorithm()}
          >
            Start
          </button>
          <button
            id="btnReset"
            className="reset"
            onClick={() => this.resetGrid()}
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
                        onMouseDown={position => this.handleMouseDown(position)}
                        onMouseEnter={position =>
                          this.handleMouseEnter(position)
                        }
                        onMouseUp={() => this.handleMouseUp(position)}
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
  }
}
