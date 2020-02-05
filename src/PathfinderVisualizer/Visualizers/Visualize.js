export const animateShortestPath = backtrackRoute => {
  for (let i = 0; i < backtrackRoute.length; i++) {
    setTimeout(() => {
      const vertex = backtrackRoute[i];
      document.getElementById(
        `vertex-${vertex.position.row}-${vertex.position.col}`
      ).className = "vertex vertex-shortest-path";
    }, 40 * i);
  }
  document.getElementById("btnStart").disabled = false;
  document.getElementById("btnReset").disabled = false;
  document.getElementById("root").style = "pointer-events: initial";
};

export const animateAlgorithm = (visitedInOrder, backtrackedVertices) => {
  for (let i = 0; i <= visitedInOrder.length; i++) {
    if (i === visitedInOrder.length) {
      setTimeout(() => {
        animateShortestPath(backtrackedVertices);
      }, 40 * i);
      return;
    }
    setTimeout(() => {
      const row = visitedInOrder[i].position.row;
      const col = visitedInOrder[i].position.col;
      const isStart = visitedInOrder[i].isStart;
      const isFinish = visitedInOrder[i].isFinish;

      if (!(isStart || isFinish))
        document.getElementById(`vertex-${row}-${col}`).className =
          "vertex vertex-visited";
    }, 40 * i);
  }
};
