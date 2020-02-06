/**
 *
 * This performs the Dijkstra algorithm returning all vertices that were
 * visited. Change the previousVertex value of the vertex to
 * backtrack from the finish vertex to the start vertex
 *
 */
export const dijkstra = (
  grid,
  start,
  finish,
  distanceMethod,
  allowDiagonal
) => {
  const visitedInOrder = [];
  start.distance = 0;
  // get all vertices
  const unvisitedVertices = getAllVertices(grid);
  while (unvisitedVertices.length !== 0) {
    getTheClosestVerticesFirst(unvisitedVertices);
    const closestVertex = unvisitedVertices.shift();
    console.log("distance of closest vertex is: ", closestVertex.distance);
    if (closestVertex.isWall) continue;
    if (closestVertex.distance === Infinity) return visitedInOrder;
    updateUnvisitedNeighbors(
      closestVertex,
      grid,
      distanceMethod,
      allowDiagonal
    );
    closestVertex.isVisited = true;
    visitedInOrder.push(closestVertex);
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

const updateUnvisitedNeighbors = (
  vertex,
  grid,
  distanceMethod,
  allowDiagonal
) => {
  getUnvisitedNeighbors(vertex, grid, distanceMethod, allowDiagonal);
};

const getUnvisitedNeighbors = (vertex, grid, distanceMethod, allowDiagonal) => {
  const { row, col } = vertex.position;

  if (allowDiagonal) {
    let hVDistance, dDistance;
    switch (distanceMethod) {
      case "manhattan":
        hVDistance = 1;
        dDistance = 2;
        break;
      case "euclidean":
        hVDistance = 1;
        dDistance = 1.4;
        break;
      case "chebyshev":
        hVDistance = 1;
        dDistance = 1;
        break;
      default:
        hVDistance = 1;
        dDistance = 2;
    }
    // Top
    let t;
    if (row - 1 >= 0) {
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
  } else {
    //  non diagonal movements only
    if (
      row > 0 &&
      !grid[row - 1][col].isVisited &&
      !grid[row - 1][col].isWall
    ) {
      grid[row - 1][col].distance = vertex.distance + 1;
      grid[row - 1][col].previousVertex = vertex;
    }
    if (
      col < grid[0].length - 1 &&
      !grid[row][col + 1].isVisited &&
      !grid[row][col + 1].isWall
    ) {
      grid[row][col + 1].distance = vertex.distance + 1;
      grid[row][col + 1].previousVertex = vertex;
    }
    if (
      row < grid.length - 1 &&
      !grid[row + 1][col].isVisited &&
      !grid[row + 1][col].isWall
    ) {
      grid[row + 1][col].distance = vertex.distance + 1;
      grid[row + 1][col].previousVertex = vertex;
    }
    if (
      col > 0 &&
      !grid[row][col - 1].isVisited &&
      !grid[row][col - 1].isWall
    ) {
      grid[row][col - 1].distance = vertex.distance + 1;
      grid[row][col - 1].previousVertex = vertex;
    }
  }
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
