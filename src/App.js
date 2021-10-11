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

  if (action.type === "SET") {
    const id = action.payload.order;
    const index = state.cells.findIndex((cell) => cell.id === id);
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
      <footer>
        <div className="footer">
          <div>Copyright © 2021</div>
          <a href="https://github.com/Aakash3101/EqTex">
            <div className="github">
              <i className="fa fa-github" style={{ fontSize: "1.5rem" }} />
            </div>
          </a>
        </div>
      </footer>
    </CellContext.Provider>
  );
}

export default App;
