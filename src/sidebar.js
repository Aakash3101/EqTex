import React, { useState } from "react";
import Symbols from "./symbols";

const buttonsList = [
  { id: 1, name: "Math", type: "math" },
  { id: 2, name: "Trignometry", type: "trigno" },
  { id: 3, name: "Keywords", type: "keyword" },
  { id: 4, name: "Operators", type: "operators" },
  { id: 5, name: "Logic", type: "logic" },
  { id: 6, name: "Arrows", type: "arrows" },
  { id: 7, name: "Accents", type: "accents" },
  { id: 8, name: "Sets", type: "sets" },
  { id: 9, name: "Greek", type: "greek" },
  { id: 10, name: "Symbols", type: "symbols" },
  { id: 11, name: "Brackets", type: "brackets" },
  { id: 12, name: "Binary Operators", type: "binary" },
  { id: 13, name: "Relational operators", type: "relation" },
  { id: 14, name: "Chemical Equations", type: "chemical" },
];

const Sidebar = () => {
  const [type, setType] = useState("math");

  const showSymbols = (_type) => {
    console.log(_type);
    setType(_type);
  };

  return (
    <div className="sidebar">
      <div className="symbol-headers">
        {buttonsList.map((button) => {
          return (
            <button
              key={button.id}
              className={
                type === button.type ? "grid-button-active" : "grid-buttons"
              }
              onClick={() => showSymbols(button.type)}
            >
              {button.name}
            </button>
          );
        })}
      </div>
      <div id={type}>
        <Symbols type={type} />
      </div>
    </div>
  );
};

export default Sidebar;
