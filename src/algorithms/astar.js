/**
 *
 * This performs the Dijkstra algorithm returning all vertices that were
 * visited. Change the previousVertex value of the vertex to
 * backtrack from the finish vertex to the start vertex
 *
 */
export const astar = (grid, start, finish) => {
  console.log("starting astar");
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
    updateUnvisitedNeighbors(closestVertex, grid, start, finish);
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

const updateUnvisitedNeighbors = (vertex, grid, start, finish) => {
  getUnvisitedNeighbors(vertex, grid, start, finish);
};

const getUnvisitedNeighbors = (vertex, grid, start, finish) => {
  const { row, col } = vertex.position;

  // Top
  let t;
  if (row - 1 >= 0) {
    // Top Left
    if (col - 1 > 0) {
      t = grid[row - 1][col - 1];
      let tempF =
        vertex.distanceToThis +
        distanceFromStartToThis(vertex, t) +
        calculateHeuristic(t, finish);
      if (!t.isWall && !t.isVisited) {
        if (t.distance === Infinity || t.distance < tempF) {
          t.distanceToThis =
            vertex.distanceToThis + distanceFromStartToThis(t, vertex);
          t.heuristic = calculateHeuristic(t, finish);
          t.distance = t.distanceToThis + t.heuristic;
          t.previousVertex = vertex;
        } else {
          t.distance = tempF;
        }
      }
    }
    // Top Top
    t = grid[row - 1][col];
    let tempF =
      vertex.distanceToThis +
      distanceFromStartToThis(vertex, t) +
      calculateHeuristic(t, finish);
    if (!t.isWall && !t.isVisited) {
      if (t.distance === Infinity || t.distance < tempF) {
        t.distanceToThis =
          vertex.distanceToThis + distanceFromStartToThis(t, vertex);
        t.heuristic = calculateHeuristic(t, finish);
        t.distance = t.distanceToThis + t.heuristic;
        t.previousVertex = vertex;
      } else {
        t.distance = tempF;
      }
    }

    // Top Right
    if (col + 1 < grid[0].length) {
      t = grid[row - 1][col + 1];
      let tempF =
        vertex.distanceToThis +
        distanceFromStartToThis(vertex, t) +
        calculateHeuristic(t, finish);
      if (!t.isWall && !t.isVisited) {
        if (t.distance === Infinity || t.distance < tempF) {
          t.distanceToThis =
            vertex.distanceToThis + distanceFromStartToThis(t, vertex);
          t.heuristic = calculateHeuristic(t, finish);
          t.distance = t.distanceToThis + t.heuristic;
          t.previousVertex = vertex;
        } else {
          t.distance = tempF;
        }
      }
    }
  }

  // Right
  if (col + 1 < grid[0].length) {
    t = grid[row][col + 1];
    let tempF =
      vertex.distanceToThis +
      distanceFromStartToThis(vertex, t) +
      calculateHeuristic(t, finish);
    if (!t.isWall && !t.isVisited) {
      if (t.distance === Infinity || t.distance < tempF) {
        t.distanceToThis =
          vertex.distanceToThis + distanceFromStartToThis(t, vertex);
        t.heuristic = calculateHeuristic(t, finish);
        t.distance = t.distanceToThis + t.heuristic;
        t.previousVertex = vertex;
      } else {
        t.distance = tempF;
      }
    }
  }

  // Down
  if (row + 1 < grid.length) {
    // Down Right
    if (col + 1 < grid[0].length) {
      t = grid[row + 1][col + 1];
      let tempF =
        vertex.distanceToThis +
        distanceFromStartToThis(vertex, t) +
        calculateHeuristic(t, finish);
      if (!t.isWall && !t.isVisited) {
        if (t.distance === Infinity || t.distance < tempF) {
          t.distanceToThis =
            vertex.distanceToThis + distanceFromStartToThis(t, vertex);
          t.heuristic = calculateHeuristic(t, finish);
          t.distance = t.distanceToThis + t.heuristic;
          t.previousVertex = vertex;
        } else {
          t.distance = tempF;
        }
      }
    }
    // Down Down
    t = grid[row + 1][col];
    let tempF =
      vertex.distanceToThis +
      distanceFromStartToThis(vertex, t) +
      calculateHeuristic(t, finish);
    if (!t.isWall && !t.isVisited) {
      if (t.distance === Infinity || t.distance < tempF) {
        t.distanceToThis =
          vertex.distanceToThis + distanceFromStartToThis(t, vertex);
        t.heuristic = calculateHeuristic(t, finish);
        t.distance = t.distanceToThis + t.heuristic;
        t.previousVertex = vertex;
      } else {
        t.distance = tempF;
      }
    }

    // Down Left
    if (col - 1 >= 0) {
      t = grid[row + 1][col - 1];
      let tempF =
        vertex.distanceToThis +
        distanceFromStartToThis(vertex, t) +
        calculateHeuristic(t, finish);
      if (!t.isWall && !t.isVisited) {
        if (t.distance === Infinity || t.distance < tempF) {
          t.distanceToThis =
            vertex.distanceToThis + distanceFromStartToThis(t, vertex);
          t.heuristic = calculateHeuristic(t, finish);
          t.distance = t.distanceToThis + t.heuristic;
          t.previousVertex = vertex;
        } else {
          t.distance = tempF;
        }
      }
    }
  }
  // Left
  if (col - 1 > 0) {
    t = grid[row][col - 1];
    let tempF =
      vertex.distanceToThis +
      distanceFromStartToThis(vertex, t) +
      calculateHeuristic(t, finish);
    if (!t.isWall && !t.isVisited) {
      if (t.distance === Infinity || t.distance < tempF) {
        t.distanceToThis =
          vertex.distanceToThis + distanceFromStartToThis(t, vertex);
        t.heuristic = calculateHeuristic(t, finish);
        t.distance = t.distanceToThis + t.heuristic;
        t.previousVertex = vertex;
      } else {
        t.distance = tempF;
      }
    }
  }
};

export const backtrackRoute = (finish, start) => {
  const backtrackedVertices = [];
  let currentVertex = finish;
  //   currentVertex = currentVertex.previousVertex;
  if (currentVertex === null) return backtrackedVertices;
  while (currentVertex !== start) {
    currentVertex.isPath = true;
    backtrackedVertices.unshift(currentVertex);
    currentVertex = currentVertex.previousVertex;
  }
  return backtrackedVertices;
};

const calculateHeuristic = (from, to) =>
  EuclideanDistance(from.position, to.position);

const distanceFromStartToThis = (from, to) => {
  return EuclideanDistance(from.position, to.position);
};

// function ManhattanDistance(Point, Goal) {
//   // linear movement - no diagonals - just cardinal directions (NSEW)
//   return Math.abs(Point.row - Goal.row) + Math.abs(Point.col - Goal.col);
// }

// function DiagonalDistance(Point, Goal) {
//   // diagonal movement - assumes diag dist is 1, same as cardinals
//   return Math.max(
//     Math.abs(Point.row - Goal.row),
//     Math.abs(Point.col - Goal.col)
//   );
// }

function EuclideanDistance(Point, Goal) {
  return Math.sqrt(
    Math.pow(Point.row - Goal.row, 2) + Math.pow(Point.col - Goal.col, 2)
  );
}

/**
 *
 * Use onlu one Heuristic approach for solving the Astart algorithm
 * USE EUCLIDEAN DISTANCE HEURISTICS
 */
