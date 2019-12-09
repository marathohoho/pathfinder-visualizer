/**
 *
 * This performs the Dijkstra algorithm returning all vertices that were
 * visited. Change the previousVertex value of the vertex to
 * backtrack from the finish vertex to the start vertex
 *
 */
export const dijkstra = (grid, start, finish) => {
  const visitedInOrder = [];
  // assign start vertex distance 0
  // by default the vertices are infinite distance away from the start
  start.distance = 0;
  // get all vertices
  const unvisitedVertices = getAllVertices(grid);
  while (unvisitedVertices.length !== 0) {
    getTheClosestVerticesFirst(unvisitedVertices);
    const closestVertex = unvisitedVertices.shift();
    console.log("closes vertex: ", closestVertex.position);
    console.log("closes vertex is wall? : ", closestVertex.isWall);
    console.log("closes vertex is visited? : ", closestVertex.isVisited);

    // skip the wall vertex
    if (closestVertex.isWall) continue;
    // if the closes vertex is infinity
    // there must be only walls surrounding us
    // return the visitedVertices
    if (closestVertex.distance === Infinity) return visitedInOrder;
    closestVertex.isVisited = true;

    visitedInOrder.push(closestVertex);
    if (closestVertex === finish) return visitedInOrder;
    updateUnvisitedNeighbors(closestVertex, grid);
    console.log("closes vertex: ", closestVertex.position);
    console.log("closes vertex is wall? : ", closestVertex.isWall);
    console.log("closes vertex is visited? : ", closestVertex.isVisited);
  }
};

const getAllVertices = grid => {
  const vertices = [];
  for (const row of grid) for (const vertex of row) vertices.push(vertex);
  return vertices;
};

// sort the vertices by ascending distance value
const getTheClosestVerticesFirst = unvisitedVertices => {
  unvisitedVertices.sort(
    (vertexA, vertexB) => vertexA.distance - vertexB.distance
  );
};

const updateUnvisitedNeighbors = (vertex, grid) => {
  // find the next unvisited neighbors
  const unvisitedNeighbors = getUnvisitedNeighbors(vertex, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = vertex.distance + 1;
    neighbor.previousVertex = vertex;
  }
};

const getUnvisitedNeighbors = (vertex, grid) => {
  const neighbors = [];
  const { row, col } = vertex.position;

  //   if (row > 0 && col > 0) neighbors.push(grid[row - 1][col - 1]);
  //   if (row > 0) neighbors.push(grid[row - 1][col]);
  //   if (col < grid[0].length - 1 && row > 0)
  //     neighbors.push(grid[row - 1][col + 1]);
  //   if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  //   if (row < grid.length - 1 && col < grid[0].length - 1)
  //     neighbors.push(grid[row + 1][col + 1]);
  //   if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  //   if (col > 0) neighbors.push(grid[row][col - 1]);

  //   make a up/down/left/move to the next neighbor

  //   if (row < grid.length - 1 && col > 0) neighbors.push(grid[row + 1][col - 1]);
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);

  //   //   return only the neighbor that is not visited
  return neighbors.filter(neighbor => !neighbor.isVisited);
};

export const backtrackRoute = finish => {
  const backtrackedVertices = [];
  let currentVertex = finish;
  while (currentVertex !== null) {
    currentVertex.isPath = true;
    backtrackedVertices.unshift(currentVertex);
    currentVertex = currentVertex.previousVertex;
  }
  console.log(backtrackedVertices);
  return backtrackedVertices;
};
