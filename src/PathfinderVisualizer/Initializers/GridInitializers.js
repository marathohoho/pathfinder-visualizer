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
  for (let row = 0; row < 20; row++) {
    grid[row][14].isWall = true;
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
    distanceToThis: 0,
    heuristic: 0,
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
    isWall: !vertex.isWall, //changed here
    isPath: false,
    isVisited: false,
    distance: Infinity,
    distanceToThis: Infinity,
    heuristic: Infinity,
    draggable: false,
    previousVertex: null
  };
  wallGrid[position.row][position.col] = newVertex;
  return wallGrid;
};

export const createGridWithWallsOnRowOrColumn = (
  grid,
  orientation,
  start,
  end,
  division_point,
  skip_this_cell
) => {
  const wallgrid = [...grid];
  if (orientation === "vertical") {
    for (let row = start; row < end; row++) {
      if (
        grid[row][division_point].isStart ||
        grid[row][division_point].isFinish
      )
        continue;
      if (row !== skip_this_cell) {
        let vertex = wallgrid[row][division_point];
        let newVertex = {
          ...vertex,
          isWall: !vertex.isWall, //changed here
          isPath: false,
          isVisited: false,
          distance: Infinity,
          distanceToThis: Infinity,
          heuristic: Infinity,
          draggable: false,
          previousVertex: null
        };
        wallgrid[row][division_point] = newVertex;
      }
    }
  } else {
    for (let col = start; col < end; col++) {
      if (
        grid[division_point][col].isStart ||
        grid[division_point][col].isFinish
      )
        continue;
      if (col !== skip_this_cell) {
        let vertex = wallgrid[division_point][col];
        let newVertex = {
          ...vertex,
          isWall: !vertex.isWall, //changed here
          isPath: false,
          isVisited: false,
          distance: Infinity,
          distanceToThis: Infinity,
          heuristic: Infinity,
          draggable: false,
          previousVertex: null
        };
        wallgrid[division_point][col] = newVertex;
      }
    }
  }
  return wallgrid;
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
    distanceToThis: 0,
    heuristic: 0,
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
      grid[row][col].distanceToThis = 0;
      grid[row][col].heuristic = 0;
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
