import React, { useReducer } from "react";
import gridContext from "./gridContext";
import gridReducer from "./gridReducer";

import {
  SET_GRID,
  GET_GRID,
  SET_STARTING_ROW,
  GET_STARTING_ROW,
  SET_STARTING_COL,
  GET_STARTING_COL,
  SET_FINISH_ROW,
  GET_FINISH_ROW,
  SET_MOUSE_IS_PRESSED,
  GET_MOUSE_IS_PRESSED
} from "../types.js";

/**
 * Need to update :
 * 1. Start/Finish
 * 2. Grid
 * 3. Grid with walls
 * 4. mouseIsPressed
 * 5. isDragging
 *
 */
const GridState = props => {
  const initialState = {
    grid: [],
    mouseIsPressed: false,
    isDragging: false
  };
  const [state, dispatch] = useReducer(gridReducer, initialState);
  const setGrid_ = (grid, type) => {
    dispatch({ type: SET_GRID, payload: { grid, type } });
  };
  return (
    <gridContext.Provider value={{ grid: state.grid, setGrid_ }}>
      {props.children}
    </gridContext.Provider>
  );
};

export default GridState;

// // *************************************
// import alertReducer from "./alertReducer";
// import alertContext from "./alertContext";

// import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertState = props => {
  const initialState = {
    alert: null
  };
  const [state, dispatch] = useReducer(alertReducer, initialState);

  //set alert
  const setAlert_ = (message, type) => {
    dispatch({ type: SET_ALERT, payload: { message, type } });
    const timeout = 5000;
    setTimeout(() => dispatch({ type: REMOVE_ALERT }), timeout);
  };

  return (
    <alertContext.Provider
      value={{
        alert: state.alert,
        setAlert_
      }}
    >
      {props.children}
    </alertContext.Provider>
  );
};

export default AlertState;
