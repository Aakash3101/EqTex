import React, { useReducer } from "react";
import Cell from "./cell";

const reducer = (state, action) => {
  if (action.type === "ADD_CELL") {
    const newCells = [...state.cells, action.payload];
    return {
      ...state,
      cells: newCells,
    };
  }

  if (action.type === "REMOVE_CELL") {
    const newCells = state.cells.filter((cell) => cell.id !== action.payload);
    return { ...state, cells: newCells };
  }
};

const defaultState = {
  cells: [{ id: 1, defaultContent: "\\frac{1}{2}" }],
};

const Workspace = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const addCell = () => {
    const newCell = {
      id: new Date().getTime().toString(),
      defaultContent: "x^2 + 3x + 2 = 0",
    };
    dispatch({ type: "ADD_CELL", payload: newCell });
  };

  const removeCell = (id) => {
    dispatch({ type: "REMOVE_CELL", payload: id });
  };

  return (
    <div className="workspace">
      {state.cells.map((cell) => {
        return (
          <Cell
            key={cell.id}
            order={cell.id}
            content={cell.defaultContent}
            add={addCell}
            remove={removeCell}
          />
        );
      })}
    </div>
  );
};

export default Workspace;
