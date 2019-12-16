import React from "react";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";

import GridContext from "../context/grid/gridContext";

const DistancePicker = ({ getDistanceMethod, chooseDiagonal }) => {
  const gridContext = React.useContext(GridContext);
  const {
    allowDiagonal,
    distanceMethod,
    setAllowDiagonal,
    setDistanceMethod
  } = gridContext;

  const handleDistanceMethod = event => {
    setDistanceMethod(event.target.value);
    getDistanceMethod(event.target.value);
  };

  const handleDiagonal = event => {
    setAllowDiagonal(event.target.checked);
    chooseDiagonal(event.target.checked);
  };

  return (
    <div style={{ display: "block", marginTop: "10px", textAlign: "center" }}>
      <FormGroup row style={{ textAlign: "center", display: "block" }}>
        <FormControlLabel
          control={
            <Radio
              checked={distanceMethod === "manhattan"}
              onChange={handleDistanceMethod}
              value="manhattan"
              name="choose-distance-method"
              label="m"
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
            />
          }
          label="euclidean"
        />
        <FormControlLabel
          control={
            <Checkbox checked={allowDiagonal} onChange={handleDiagonal} />
          }
          label="diagonal"
        />
      </FormGroup>
    </div>
  );
};

export default DistancePicker;
