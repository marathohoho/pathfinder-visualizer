/**
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
  //   make a up/down/left/move to the next neighbor
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  //   return only the neighbor that is not visited
  return neighbors.filter(neighbor => !neighbor.isVisited);
};

export const backtrackRoute = () => {};
