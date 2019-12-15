import React from "react";
import PropTypes from "prop-types";
import "./Vertex.css";

const Vertex = props => {
  const {
    position,
    isFinish,
    isStart,
    isWall,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
    isVisited,
    isPath,
    onDragStart,
    onDragOver,
    onDrop,
    distance,
    draggable
    // onDrag
  } = props;
  const extraClassName = isFinish
    ? "vertex-finish"
    : isStart
    ? "vertex-start"
    : isWall
    ? "vertex-wall vertex-non-draggable"
    : isPath
    ? "vertex-shortest-path vertex-non-draggable"
    : isVisited
    ? "vertex-visited vertex-non-draggable"
    : "vertex-non-draggable";

  console.log("triggered");
  return (
    <td
      id={`vertex-${position.row}-${position.col}`}
      className={`vertex ${extraClassName}`}
      onMouseDown={() => onMouseDown(position)}
      onMouseEnter={() => onMouseEnter(position)}
      onMouseUp={() => onMouseUp(position)}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      draggable={(isStart || isFinish) && !isWall}
    >
      {distance === Infinity ? "I" : distance}
    </td>
  );
};

Vertex.propTypes = {
  position: PropTypes.object,
  isFinish: PropTypes.bool,
  isStart: PropTypes.bool,
  isWall: PropTypes.bool,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseEnter: PropTypes.func,
  mouseIsPressed: PropTypes.bool
};

export default Vertex;
