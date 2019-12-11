import { ROWS, COLUMNS } from "../../parameters";

export const createInitialGrid = start_finish => {
  const grid = [];
  for (let row = 0; row < ROWS; row++) {
    const thisRow = [];
    for (let col = 0; col < COLUMNS; col++) {
      thisRow.push(createVertex({ row, col }, start_finish));
    }
    grid.push(thisRow);
  }
  return grid;
};

const createVertex = (position, start_finish) => {
  const {
    start_vertex_row,
    start_vertex_col,
    finish_vertex_row,
    finish_vertex_col
  } = start_finish;
  return {
    position,
    isStart:
      position.row === start_vertex_row && position.col === start_vertex_col,
    isFinish:
      position.row === finish_vertex_row && position.col === finish_vertex_col,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    isPath: false,
    previousVertex: null,
    draggable:
      (position.row === start_vertex_row &&
        position.col === start_vertex_col) ||
      (position.row === finish_vertex_row && position.col === finish_vertex_col)
  };
};

export const createGridWithWalls = (grid, position) => {
  const wallGrid = [...grid];
  const vertex = wallGrid[position.row][position.col];
  const newVertex = {
    ...vertex,
    isWall: !vertex.isWall,
    draggable: false
  };
  wallGrid[position.row][position.col] = newVertex;
  return wallGrid;
};
