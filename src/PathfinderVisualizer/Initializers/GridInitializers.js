import {
  ROWS,
  COLUMNS,
  START_VERTEX_ROW,
  START_VERTEX_COL,
  FINISH_VERTEX_ROW,
  FINISH_VERTEX_COL
} from "../../parameters";

export const createInitialGrid = () => {
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
    isPath: false,
    previousVertex: null,
    draggable:
      (position.row === START_VERTEX_ROW &&
        position.col === START_VERTEX_COL) ||
      (position.row === FINISH_VERTEX_ROW && position.col === FINISH_VERTEX_COL)
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
