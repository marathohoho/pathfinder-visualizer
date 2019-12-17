import { ROWS, COLUMNS } from "../parameters";

import { createGridWithWallsOnRowOrColumn } from "../PathfinderVisualizer/Initializers/GridInitializers";

export const mazeGenerator = grid => {
  console.log(ROWS, COLUMNS);
  mazeGeneratorHelper(
    grid,
    0,
    0,
    ROWS,
    COLUMNS,
    pickOrientation(ROWS, COLUMNS)
  );
  return grid;
};

const mazeGeneratorHelper = (grid, row, col, height, width, orientation) => {
  console.log(height, width);
  if (width <= 2 || height <= 2) return;
  let horizontal = orientation === "horizontal";
  let length = horizontal ? width : height;
  let divide_here;
  if (horizontal) divide_here = row + getRandomInt(height);
  else divide_here = col + getRandomInt(width);
  console.log(divide_here);
  // let skip_cell_on_row = divide_here + (horizontal ? 0 : )

  let skip_this_cell;
  skip_this_cell = horizontal
    ? getRandomInt(width - 2)
    : getRandomInt(height - 2);
  console.log(skip_this_cell);
  let start = horizontal ? col : row;

  createGridWithWallsOnRowOrColumn(
    grid,
    orientation,
    start,
    length,
    divide_here,
    skip_this_cell
  );
  return grid;
  //   let new_row = row;
  //   let new_col = col;
  //   let w, h;
  //   w = horizontal ? width : divide_here - row + 1;
  //   h = horizontal ? divide_here - col + 1 : height;
  //   mazeGeneratorHelper(grid, new_row, new_col, w, h, pickOrientation(w, h));

  //   new_row = horizontal ? row : divide_here + 1;
  //   new_col = horizontal ? divide_here + 1 : col;
  //   w = horizontal ? width : row + width - divide_here - 1;
  //   h = horizontal ? col + height - divide_here - 1 : height;
  //   mazeGeneratorHelper(grid, new_row, new_col, w, h, pickOrientation(w, h));
};

// function for getting a random value in the range [0, max-1]
const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

const pickOrientation = (height, width) => {
  if (width >= height) return "vertical";
  else return "horizontal";
};
