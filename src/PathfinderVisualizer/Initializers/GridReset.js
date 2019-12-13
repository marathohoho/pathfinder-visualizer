import { createInitialGrid } from "../Initializers/GridInitializers";
import { ROWS, COLUMNS } from "../../parameters";

export const resetGrid = (grid, setGrid, start_finish) => {
  const resetGrid = createInitialGrid(start_finish);
  setGrid(resetGrid);
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLUMNS; col++) {
      let thisVertex = grid[row][col];
      if (thisVertex.isStart)
        document.getElementById(`vertex-${row}-${col}`).className =
          "vertex vertex-start";
      else if (thisVertex.isFinish)
        document.getElementById(`vertex-${row}-${col}`).className =
          "vertex vertex-finish";
      else {
        document.getElementById(`vertex-${row}-${col}`).className = "vertex ";
      }
    }
  }
};
