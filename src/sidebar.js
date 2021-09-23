import React, { useState } from "react";
import Symbols from "./symbols";

const buttonsList = [
  { id: 1, name: "Math", type: "math" },
  { id: 2, name: "Binary Operators", type: "binary" },
  { id: 3, name: "Trignometry", type: "trigno" },
  { id: 4, name: "Keywords", type: "keyword" },
  { id: 5, name: "Operators", type: "operators" },
  { id: 6, name: "Logic", type: "logic" },
  { id: 7, name: "Arrows (1)", type: "arrows1" },
  { id: 7, name: "Arrows (2)", type: "arrows2" },
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
              className="grid-buttons"
              onClick={() => showSymbols(button.type)}
            >
              {button.name}
            </button>
          );
        })}
      </div>
      <br />
      <Symbols type={type} />
    </div>
  );
};

export default Sidebar;
