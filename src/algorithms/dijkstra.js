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

    if (closestVertex.isWall) continue;
    if (closestVertex.distance === Infinity) return visitedInOrder;
    updateUnvisitedNeighbors(closestVertex, grid);
    closestVertex.isVisited = true;
    visitedInOrder.push(closestVertex);
    // before was like this :
    // updateUnvisitedNeighbors(closestVertex, grid);

    if (closestVertex === finish) return visitedInOrder;
  }
};

const getAllVertices = grid => {
  const vertices = [];
  for (const row of grid) for (const vertex of row) vertices.push(vertex);
  return vertices;
};

// sort the vertices by ascending distance value
// we can use PriorityQueue to improve on performance
const getTheClosestVerticesFirst = unvisitedVertices => {
  unvisitedVertices.sort(
    (vertexA, vertexB) => vertexA.distance - vertexB.distance
  );
};

const updateUnvisitedNeighbors = (vertex, grid) => {
  const unvisitedNeighbors = getUnvisitedNeighbors(vertex, grid);
  console.log(unvisitedNeighbors);
  //  do we actually need this part
  //   for (const neighbor of unvisitedNeighbors) {
  //     neighbor.distance = vertex.distance + 1;
  //     neighbor.previousVertex = vertex;
  //   }
};

const getUnvisitedNeighbors = (vertex, grid) => {
  const neighbors = [];
  const { row, col } = vertex.position;

  // this is the diagonal move
  //   this method does not use neighbors array
  //  write straight into the grid
  const hVDistance = 1;
  const dDistance = 1.4;
  // Top
  let t;
  if (row - 1 >= 0) {
    // Top Top
    t = grid[row - 1][col];
    if (
      !t.isVisited &&
      !t.isWall &&
      t.distance > vertex.distance + hVDistance
    ) {
      t.distance = vertex.distance + hVDistance;
      t.previousVertex = vertex;
    }

    // Top Left
    if (col - 1 > 0) {
      t = grid[row - 1][col - 1];
      if (
        !t.isVisited &&
        !t.isWall &&
        t.distance > vertex.distance + dDistance
      ) {
        t.distance = vertex.distance + dDistance;
        t.previousVertex = vertex;
      }
    }

    // Top Right
    if (col + 1 < grid[0].length) {
      t = grid[row - 1][col + 1];
      if (
        !t.isVisited &&
        !t.isWall &&
        t.distance > vertex.distance + dDistance
      ) {
        t.distance = vertex.distance + dDistance;
        t.previousVertex = vertex;
      }
    }
  }

  // Left
  if (col - 1 > 0) {
    t = grid[row][col - 1];
    if (
      !t.isVisited &&
      !t.isWall &&
      t.distance > vertex.distance + hVDistance
    ) {
      t.distance = vertex.distance + hVDistance;
      t.previousVertex = vertex;
    }
  }

  // Right
  if (col + 1 < grid[0].length) {
    t = grid[row][col + 1];
    if (
      !t.isVisited &&
      !t.isWall &&
      t.distance > vertex.distance + hVDistance
    ) {
      t.distance = vertex.distance + hVDistance;
      t.previousVertex = vertex;
    }
  }
  // Down
  if (row + 1 < grid.length) {
    // Down Down
    t = grid[row + 1][col];
    if (
      !t.isVisited &&
      !t.isWall &&
      t.distance > vertex.distance + hVDistance
    ) {
      t.distance = vertex.distance + hVDistance;
      t.previousVertex = vertex;
    }

    // Down Left
    if (col - 1 >= 0) {
      t = grid[row + 1][col - 1];
      if (
        !t.isVisited &&
        !t.isWall &&
        t.distance > vertex.distance + dDistance
      ) {
        t.distance = vertex.distance + dDistance;
        t.previousVertex = vertex;
      }
    }

    // Down Right
    if (col + 1 < grid[0].length) {
      t = grid[row + 1][col + 1];
      if (
        !t.isVisited &&
        !t.isWall &&
        t.distance > vertex.distance + dDistance
      ) {
        t.distance = vertex.distance + dDistance;
        t.previousVertex = vertex;
      }
    }
  }

  //   adjust this logic
  // give the user an option of travelling diagonally or not
  // this is not the diagonal move
  //   if (row > 0) neighbors.push(grid[row - 1][col]);
  //   if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  //   if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  //   if (col > 0) neighbors.push(grid[row][col - 1]);

  //  we can do this check when pushing the vertex into the neighbors list,
  // don;t push the vertex that is a wall
  //   return neighbors.filter(neighbor => !neighbor.isVisited);
  return neighbors;
};

export const backtrackRoute = (finish, start) => {
  const backtrackedVertices = [];
  let currentVertex = finish;
  currentVertex = currentVertex.previousVertex;
  if (currentVertex === null) return backtrackedVertices;
  while (currentVertex !== start) {
    currentVertex.isPath = true;
    backtrackedVertices.unshift(currentVertex);
    currentVertex = currentVertex.previousVertex;
  }
  return backtrackedVertices;
};
