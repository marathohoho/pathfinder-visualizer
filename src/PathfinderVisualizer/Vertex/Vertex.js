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
    onMouseUp
  } = props;
  const extraClassName = isFinish
    ? "vertex-finish"
    : isStart
    ? "vertex-start"
    : isWall
    ? "vertex-wall"
    : "";
  return (
    <div
      id={`vertex-${position.row}-${position.col}`}
      className={`vertex ${extraClassName}`}
      onMouseDown={() => onMouseDown(position)}
      onMouseEnter={() => onMouseEnter(position)}
      onMouseUp={() => onMouseUp(position)}
    ></div>
  );
};

Vertex.propTypes = {
  position: PropTypes.object,
  isFinish: PropTypes.bool,
  isStart: PropTypes.bool,
  isWall: PropTypes.bool,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseEnter: PropTypes.func
};

export default Vertex;
