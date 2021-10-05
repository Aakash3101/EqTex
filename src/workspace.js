import React, { useContext } from "react";
import { CellContext } from "./App";
import Cell from "./cell";

const Workspace = () => {
  const cellContext = useContext(CellContext);

  const addCell = () => {
    const newCell = {
      id: new Date().getTime().toString(),
      defaultContent: "x^2 + 3x + 2 = 0",
      title: "## New Equation",
    };
    cellContext.dispatch({ type: "ADD_CELL", payload: newCell });
  };

  const removeCell = (id) => {
    cellContext.dispatch({ type: "REMOVE_CELL", payload: id });
  };
  return (
    <div className="workspace">
      {cellContext.state.cells.map((cell, index) => {
        return (
          <Cell key={cell.id} index={index} add={addCell} remove={removeCell} />
        );
      })}
    </div>
  );
};

export default Workspace;
