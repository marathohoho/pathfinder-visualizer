/**
 *
 * Deleted all the get actions, because triggering the data
 * does not happen in the reducer. Only setting the state values happen
 * in reducer.
 * State values can be retrieved inside the functional component itself.
 *
 */

import {
  SET_GRID,
  SET_STARTING_ROW,
  SET_STARTING_COL,
  SET_FINISH_ROW,
  SET_FINISH_COL,
  SET_MOUSE_IS_PRESSED,
  IS_DRAGGING
} from "../types.js";

export default (state, action) => {
  switch (action.type) {
    case SET_GRID:
      return { ...state, grid: action.payload };

    case SET_STARTING_ROW:
      return { ...state, start_vertex_row: action.payload };

    case SET_STARTING_COL:
      return { ...state, start_vertex_col: action.payload };

    case SET_FINISH_ROW:
      return { ...state, finish_vertex_row: action.payload };

    case SET_FINISH_COL:
      return { ...state, finish_vertex_col: action.payload };

    case SET_MOUSE_IS_PRESSED:
      return { ...state, mouseIsPressed: action.payload };

    case IS_DRAGGING:
      return { ...state, isDragging: action.payload };

    default:
      return state;
  }
};
