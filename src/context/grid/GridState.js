import React, { useReducer } from "react";
import gridContext from "./gridContext";
import gridReducer from "./gridReducer";

import {
  START_VERTEX_ROW_,
  START_VERTEX_COL_,
  FINISH_VERTEX_ROW_,
  FINISH_VERTEX_COL_
} from "../../parameters";

import {
  SET_GRID,
  SET_STARTING_ROW,
  SET_STARTING_COL,
  SET_FINISH_ROW,
  SET_FINISH_COL,
  SET_MOUSE_IS_PRESSED,
  IS_DRAGGING
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
    isDragging: false,
    start_vertex_row: START_VERTEX_ROW_,
    start_vertex_col: START_VERTEX_COL_,
    finish_vertex_row: FINISH_VERTEX_ROW_,
    finish_vertex_col: FINISH_VERTEX_COL_
  };

  /**
   *
   * this is where we set all the state variables
   * vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
   */
  const [state, dispatch] = useReducer(gridReducer, initialState);

  const setGrid = grid => {
    dispatch({ type: SET_GRID, payload: grid });
  };

  const setStart = position => {
    dispatch({ type: SET_STARTING_ROW, payload: position.row });
    dispatch({ type: SET_STARTING_COL, payload: position.col });
  };

  const setFinish = position => {
    dispatch({ type: SET_FINISH_ROW, payload: position.row });
    dispatch({ type: SET_FINISH_COL, payload: position.col });
  };

  const setMouseIsPressed = pressed => {
    dispatch({ type: SET_MOUSE_IS_PRESSED, payload: pressed });
  };

  const setIsDragging = started_dragging => {
    dispatch({ type: IS_DRAGGING, payload: started_dragging });
  };

  /**
   * ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   * this is where we set all the state variables
   */

  /**
   * this is where we return the state variables
   * vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
   */
  return (
    <gridContext.Provider
      value={{
        grid: state.grid,
        isDragging: state.isDragging,
        mouseIsPressed: state.mouseIsPressed,
        start_vertex_row: state.start_vertex_row,
        start_vertex_col: state.start_vertex_col,
        finish_vertex_row: state.finish_vertex_row,
        finish_vertex_col: state.finish_vertex_col,
        setGrid,
        setStart,
        setFinish,
        setMouseIsPressed,
        setIsDragging
      }}
    >
      {props.children}
    </gridContext.Provider>
  );
};
/**
 * ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 * this is where we return the state variables
 */

export default GridState;
