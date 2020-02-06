import React from "react";
import PropTypes from "prop-types";
import "./Vertex.scss";
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
    onDrop
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

  const start_overlay = (
    <svg
      id="start-svg"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="27px"
      height="27px"
      viewBox="0 0 54 54"
      style={{ transform: "rotate(0deg)" }}
    >
      <path
        fillRule="evenodd"
        fill="#12375a"
        d="M24.996,49.999 C11.214,49.999 0.002,38.785 0.002,25.001 C0.002,11.216 11.214,0.001 24.996,0.001 C38.782,0.001 49.998,11.216 49.998,25.001 C49.998,38.785 38.782,49.999 24.996,49.999 ZM24.996,2.294 C12.479,2.294 2.296,12.480 2.296,25.001 C2.296,37.521 12.479,47.706 24.996,47.706 C37.517,47.706 47.704,37.521 47.704,25.001 C47.704,12.480 37.517,2.294 24.996,2.294 ZM14.887,41.362 L24.672,24.911 L14.887,8.971 L42.940,25.164 L14.887,41.362 Z"
      />
    </svg>
  );
  const finish_overlay = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="27px"
      height="27px"
      viewBox="0 0 54 54"
    >
      <path
        fillRule="evenodd"
        fill="#12375a"
        d="M25.000,0.001 L33.239,15.714 L49.997,19.099 L38.332,32.195 L40.449,49.999 L25.000,42.379 L9.551,49.999 L11.668,32.195 L0.003,19.099 L16.761,15.714 L25.000,0.001 "
      />
    </svg>
  );
  //   const start_circle = (
  //     <svg
  //       id="start-svg"
  //       xmlns="http://www.w3.org/2000/svg"
  //       xmlnsXlink="http://www.w3.org/1999/xlink"
  //       width="27px"
  //       height="27px"
  //       viewBox="0 0 54 54"
  //       style={{ transform: "rotate(0)" }}
  //     >
  //       <path
  //         fillRule="evenodd"
  //         fill="#12375a"
  //         d="M50.000,25.000 C50.000,38.807 38.807,50.000 25.000,50.000 C11.193,50.000 -0.000,38.807 -0.000,25.000 C-0.000,11.193 11.193,-0.000 25.000,-0.000 C38.807,-0.000 50.000,11.193 50.000,25.000 Z"
  //       />
  //     </svg>
  //   );
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
      {isStart ? start_overlay : isFinish ? finish_overlay : ""}
      {/* {(position.row, position.col)} */}
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
