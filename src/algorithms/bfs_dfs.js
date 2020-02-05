export const bfs_dfs = (grid, start, finish, algorithm) => {
  if (!start || !finish || start === finish) return [];
  let visitedInOrder = [];

  let structure = [start];
  let currentVertex;
  let neighbors = [];

  //  dfs
  if (algorithm === "dfs") {
    while (structure.length) {
      currentVertex = structure.pop();
      console.log("i am doing dfs");
      currentVertex.isVisited = true;

      if (currentVertex === finish) return visitedInOrder;
      visitedInOrder.push(currentVertex);
      neighbors = getNeighbors(grid, currentVertex);
      console.log(`Neighbors lsit is : ${neighbors}`);
      neighbors.forEach(neighbor => {
        if (!neighbor.isVisited) {
          neighbor.previousVertex = currentVertex;
          structure.push(neighbor);
        }
      });
    }
  } else {
    // let i = 4;
    while (structure.length) {
      console.log(`Structure is : `, structure);
      currentVertex = structure.shift();
      console.log("i am doing bfs");

      currentVertex.isVisited = true;
      if (currentVertex === finish) return visitedInOrder;
      neighbors = getNeighbors(grid, currentVertex);

      visitedInOrder.push(currentVertex);
      console.log(`Neighbors lsit is :`, neighbors);

      neighbors.forEach(neighbor => {
        if (!neighbor.isVisited) {
          neighbor.previousVertex = currentVertex;
          structure.push(neighbor);
        }
      });
    }
  }
  return visitedInOrder;
};

const getNeighbors = (grid, vertex) => {
  const { row, col } = vertex.position;
  const neighbors = [];
  if (row > 0 && !grid[row - 1][col].isWall && !grid[row - 1][col].isVisited)
    neighbors.push(grid[row - 1][col]);
  if (
    col < grid[0].length - 1 &&
    !grid[row][col + 1].isWall &&
    !grid[row][col + 1].isVisited
  )
    neighbors.push(grid[row][col + 1]);
  if (
    row < grid.length - 1 &&
    !grid[row + 1][col].isWall &&
    !grid[row + 1][col].isVisited
  )
    neighbors.push(grid[row + 1][col]);
  if (col > 0 && !grid[row][col - 1].isWall && !grid[row][col - 1].isVisited)
    neighbors.push(grid[row][col - 1]);

  return neighbors;
};
