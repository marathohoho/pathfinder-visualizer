export const animateShortestPath = (starting_point, backtrackRoute) => {
  const start_row = starting_point.start_vertex_row;
  const start_col = starting_point.start_vertex_col;
  for (let i = 0; i < backtrackRoute.length; i++) {
    setTimeout(() => {
      const vertex = backtrackRoute[i];
      const row = vertex.position.row;
      const col = vertex.position.col;
      /* determine the direction at which the move will go. 1 of 8 directions */
      /* right, down-right, down, down-left .... up, up-right */
      const arrow = document.getElementById("start-svg");
      if (i === 0) {
        if (row === start_row && col === start_col + 1)
          arrow.style.transform = "rotate(0deg)";
        else if (row === start_row + 1 && col === start_col + 1)
          arrow.style.transform = "rotate(45deg)";
        else if (row === start_row + 1 && col === start_col)
          arrow.style.transform = "rotate(90deg)";
        else if (row === start_row + 1 && col === start_col - 1)
          arrow.style.transform = "rotate(135deg)";
        else if (row === start_row && col === start_col - 1)
          arrow.style.transform = "rotate(180deg)";
        else if (row === start_row - 1 && col === start_col - 1)
          arrow.style.transform = "rotate(-135deg)";
        else if (row === start_row - 1 && col === start_col)
          arrow.style.transform = "rotate(-90deg)";
        else if (row === start_row - 1 && col === start_col + 1)
          arrow.style.transform = "rotate(-45deg)";
      }
      document.getElementById(
        `vertex-${vertex.position.row}-${vertex.position.col}`
      ).className = "vertex vertex-shortest-path";
    }, 40 * i);
  }
  document.getElementById("btnStart").disabled = false;
  document.getElementById("btnReset").disabled = false;
  document.getElementById("table").style = "pointer-events: initial";
  document.getElementById("disable-div").style = "pointer-events: initial";
};

export const animateAlgorithm = (
  starting_point,
  visitedInOrder,
  backtrackedVertices
) => {
  const animationTime = 40;
  for (let i = 0; i <= visitedInOrder.length; i++) {
    if (i === visitedInOrder.length) {
      setTimeout(() => {
        animateShortestPath(starting_point, backtrackedVertices);
      }, animationTime * i);
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
    }, animationTime * i);
  }
};
