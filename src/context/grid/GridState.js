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
  IS_DRAGGING,
  SET_ORIGINAL_ROW,
  SET_ORIGINAL_COL,
  SET_TRANSLATE_ROW,
  SET_TRANSLATE_COL,
  SET_LAST_TRANSLATE_ROW,
  SET_LAST_TRANSLATE_COL,
  SET_DISTANCE_METHOD,
  SET_ALLOW_DIAGONAL,
  SET_ALGORITHM
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

    start_vertex_row: START_VERTEX_ROW_,
    start_vertex_col: START_VERTEX_COL_,
    finish_vertex_row: FINISH_VERTEX_ROW_,
    finish_vertex_col: FINISH_VERTEX_COL_,

    isDragging: false,

    original_row: 0,
    original_col: 0,

    translate_row: 0,
    translate_col: 0,

    last_translate_row: 0,
    last_translate_col: 0,

    distanceMethod: "manhattan",

    allowDiagonal: false,

    algorithm: "dijkstra"
  };

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

  //   for dragging actions
  const setIsDragging = started_dragging => {
    dispatch({ type: IS_DRAGGING, payload: started_dragging });
  };

  const setOriginal = position => {
    dispatch({ type: SET_ORIGINAL_ROW, payload: position.row });
    dispatch({ type: SET_ORIGINAL_COL, payload: position.col });
  };

  const setTranslate = position => {
    dispatch({ type: SET_TRANSLATE_ROW, payload: position.row });
    dispatch({ type: SET_TRANSLATE_COL, payload: position.col });
  };

  const setLastTranslate = position => {
    dispatch({ type: SET_LAST_TRANSLATE_ROW, payload: position.row });
    dispatch({ type: SET_LAST_TRANSLATE_COL, payload: position.col });
  };

  const setDistanceMethod = method => {
    dispatch({ type: SET_DISTANCE_METHOD, payload: method });
  };

  const setAllowDiagonal = diagonal => {
    dispatch({ type: SET_ALLOW_DIAGONAL, payload: diagonal });
  };

  const setAlgorithm = algorithm => {
    dispatch({ type: SET_ALGORITHM, payload: algorithm });
  };
  return (
    <gridContext.Provider
      value={{
        grid: state.grid,
        setGrid,
        setStart,
        setFinish,
        setMouseIsPressed,
        setIsDragging,
        setOriginal,
        setTranslate,
        setLastTranslate,
        mouseIsPressed: state.mouseIsPressed,
        start_vertex_row: state.start_vertex_row,
        start_vertex_col: state.start_vertex_col,
        finish_vertex_row: state.finish_vertex_row,
        finish_vertex_col: state.finish_vertex_col,
        isDragging: state.isDragging,
        original_row: state.original_row,
        original_col: state.original_col,
        translate_row: state.translate_row,
        translate_col: state.translate_col,
        last_translate_row: state.last_translate_row,
        last_translate_col: state.last_translate_col,
        setDistanceMethod,
        distanceMethod: state.distanceMethod,
        allowDiagonal: state.allowDiagonal,
        setAllowDiagonal,
        setAlgorithm,
        algorithm: state.algorithm
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
