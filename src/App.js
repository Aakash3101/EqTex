import React, { useReducer } from "react";
import Title from "./title.js";
import Sidebar from "./sidebar.js";
import Workspace from "./workspace.js";

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

  if (action.type === "ADD_TEXT") {
    const index = state.cells.findIndex(
      (cell) => cell.id === action.payload.id
    );
    const newCells = [...state.cells];
    newCells[index] = {
      ...newCells[index],
      defaultContent:
        newCells[index].defaultContent + " " + action.payload.text,
    };
    return { ...state, cells: newCells };
  }

  if (action.type === "SET") {
    const index = action.payload.index;
    const text = action.payload.text;
    const newCells = [...state.cells];
    newCells[index] = {
      ...newCells[index],
      defaultContent: text,
    };
    return { ...state, cells: newCells };
  }
};

const defaultState = {
  cells: [
    {
      id: new Date().getTime().toString(),
      defaultContent: "x^2+5x+10",
      title: "## New Equation",
    },
  ],
};
export const CellContext = React.createContext(defaultState);

function App() {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <CellContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <Title />
      <div className="grid-container">
        <Sidebar />
        <Workspace />
      </div>
    </CellContext.Provider>
  );
}

export default App;
