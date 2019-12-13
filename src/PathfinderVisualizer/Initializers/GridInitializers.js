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
  console.log("setting a new walled grid");
  const newVertex = {
    ...vertex,
    isWall: !vertex.isWall, //changed here
    isPath: false,
    isVisited: false,
    distance: Infinity,
    draggable: false,
    previousVertex: null
  };
  wallGrid[position.row][position.col] = newVertex;
  return wallGrid;
};

//create a function for swapping a drid vertices
export const swapVertices = (grid, vertex, new_position) => {
  const dragged_from_position = vertex.position;
  // dropped at position
  vertex.position = new_position;
  grid[new_position.row][new_position.col] = vertex;
  const empty_vertex = {
    position: dragged_from_position,
    isStart: false,
    isFinish: false,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    isPath: false,
    previousVertex: null,
    draggable: !vertex.draggable
  };
  grid[dragged_from_position.row][dragged_from_position.col] = empty_vertex;

  vertex.distance = Infinity;
  return grid;
};

export const updateGrid = grid => {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLUMNS; col++) {
      //check the vertex
      grid[row][col].distance = Infinity;
      grid[row][col].isPath = false;
      grid[row][col].isVisited = false;
      grid[row][col].previousVertex = null;
    }
  }
  return grid;
};

// need to handle move of the finish vertex
// implement live update of the shortest path when either end or start
// debug the walls placed after the move was done
