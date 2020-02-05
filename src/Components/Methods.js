import React from "react";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";

import GridContext from "../context/grid/gridContext";

const DistancePicker = ({
  getDistanceMethod,
  chooseDiagonal,
  getWhichAlgorithm
}) => {
  const gridContext = React.useContext(GridContext);
  const {
    allowDiagonal,
    distanceMethod,
    setAllowDiagonal,
    setDistanceMethod,
    setAlgorithm,
    algorithm
  } = gridContext;

  const handleDistanceMethod = event => {
    setDistanceMethod(event.target.value);
    getDistanceMethod(event.target.value);
  };

  const handleDiagonal = event => {
    setAllowDiagonal(event.target.checked);
    chooseDiagonal(event.target.checked);
  };

  const handleAlgorithmMethod = event => {
    setAlgorithm(event.target.value);
    getWhichAlgorithm(event.target.value);
  };

  return (
    <div style={{ display: "block", marginTop: "10px", textAlign: "center" }}>
      <FormGroup row style={{ textAlign: "center", display: "block" }}>
        <FormControlLabel
          control={
            <Radio
              checked={algorithm === "dijkstra"}
              onChange={handleAlgorithmMethod}
              value="dijkstra"
              name="choose-distance-method"
              label="dijkstra"
            />
          }
          label="Dijkstra"
        />
        <FormControlLabel
          control={
            <Radio
              checked={algorithm === "astar"}
              onChange={handleAlgorithmMethod}
              value="astar"
              name="choose-distance-method"
              label="astar"
            />
          }
          label="A-star"
        />
        <FormControlLabel
          control={
            <Radio
              checked={algorithm === "bfs"}
              onChange={handleAlgorithmMethod}
              value="bfs"
              name="choose-distance-method"
              label="bfs"
            />
          }
          label="Breadth-First Search"
        />
        <FormControlLabel
          control={
            <Radio
              checked={algorithm === "dfs"}
              onChange={handleAlgorithmMethod}
              value="dfs"
              name="choose-distance-method"
              label="dfs"
            />
          }
          label="Depth-First Search"
        />
      </FormGroup>

      <FormGroup row style={{ textAlign: "center", display: "block" }}>
        <FormControlLabel
          control={
            <Radio
              checked={distanceMethod === "manhattan"}
              onChange={handleDistanceMethod}
              value="manhattan"
              name="choose-distance-method"
              label="m"
              disabled={algorithm === "astar" || !allowDiagonal}
            />
          }
          label="manhattan"
        />
        <FormControlLabel
          control={
            <Radio
              checked={distanceMethod === "chebyshev"}
              onChange={handleDistanceMethod}
              value="chebyshev"
              name="choose-distance-method"
              label="c"
              disabled={algorithm === "astar" || !allowDiagonal}
            />
          }
          label="chebyshev"
        />
        <FormControlLabel
          control={
            <Radio
              checked={distanceMethod === "euclidean"}
              onChange={handleDistanceMethod}
              value="euclidean"
              name="choose-distance-method"
              label="e"
              disabled={algorithm === "astar" || !allowDiagonal}
            />
          }
          label="euclidean"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={allowDiagonal}
              onChange={handleDiagonal}
              disabled={algorithm === "astar"}
            />
          }
          label="diagonal"
        />
      </FormGroup>
    </div>
  );
};

export default DistancePicker;
