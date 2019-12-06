import React, { Component } from "react";

import "./PathfinderVisualizer.css";
import Vertex from "./Vertex/Vertex";

const ROWS = 20;
const COLUMNS = 50;
const START_VERTEX_ROW = 10;
const START_VERTEX_COL = 15;
const FINISH_VERTEX_ROW = 10;
const FINISH_VERTEX_COL = 35;

export default class PathfinderVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false
    };
  }
  componentDidMount() {
    const grid = createInitialGrid();
    this.setState({ grid });
  }

  handleMouseDown = position => {
    const wallGrid = createGridWithWalls(this.state.grid, position);
    this.setState({ grid: wallGrid, mouseIsPressed: true });
  };

  handleMouseEnter = position => {
    if (!this.state.mouseIsPressed) return;
    const wallGrid = createGridWithWalls(this.state.grid, position);
    this.setState({ grid: wallGrid });
  };
  handleMouseUp = () => {
    this.setState({ mouseIsPressed: false });
  };

  resetGrid = () => {
    const resetGrid = createInitialGrid();
    this.setState({ grid: resetGrid });
  };
  render() {
    const { grid, mouseIsPressed } = this.state;
    return (
      <div className="grid">
        <button className="reset" onClick={this.resetGrid}>
          Reset Grid
        </button>
        {grid.map((row, row_index) => {
          return (
            <div key={row_index}>
              {row.map((vertex, vertex_index) => {
                const { position, isFinish, isStart, isWall } = vertex;
                return (
                  <Vertex
                    key={vertex_index}
                    position={position}
                    isFinish={isFinish}
                    isStart={isStart}
                    onMouseDown={position => this.handleMouseDown(position)}
                    onMouseEnter={position => this.handleMouseEnter(position)}
                    onMouseUp={() => this.handleMouseUp()}
                    isWall={isWall}
                  ></Vertex>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

const createInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < ROWS; row++) {
    const thisRow = [];
    for (let col = 0; col < COLUMNS; col++) {
      thisRow.push(createVertex({ row, col }));
    }
    grid.push(thisRow);
  }
  return grid;
};

const createVertex = position => {
  return {
    position,
    isStart:
      position.row === START_VERTEX_ROW && position.col === START_VERTEX_COL,
    isFinish:
      position.row === FINISH_VERTEX_ROW && position.col === FINISH_VERTEX_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousVertex: null
  };
};

const createGridWithWalls = (grid, position) => {
  const wallGrid = [...grid];
  const vertex = wallGrid[position.row][position.col];
  const newVertex = {
    ...vertex,
    isWall: !vertex.isWall
  };
  wallGrid[position.row][position.col] = newVertex;
  console.log(vertex);
  return wallGrid;
};
