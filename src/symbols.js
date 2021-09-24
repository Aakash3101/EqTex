import React, { useState, useEffect, useContext } from "react";
import { convertLatexToMarkup } from "mathlive";
import { symbols } from "./mathsymbols";
import Parser from "html-react-parser";
import { CellContext } from "./App";

const Symbols = ({ type }) => {
  const cellContext = useContext(CellContext);
  const [activeElement, setActiveElement] = useState(document.activeElement);
  useEffect(() => {
    const onFocus = (ev) => {
      if (ev.target !== null && ev.target.tagName === "MATH-FIELD") {
        setActiveElement(ev.target);
      }
    };
    window.addEventListener("focus", onFocus, true);
    return () => {
      window.removeEventListener("focus", onFocus);
    };
  }, [activeElement]);

  const sendText = (data) => {
    if (activeElement.tagName === "MATH-FIELD") {
      cellContext.dispatch({
        type: "ADD_TEXT",
        payload: { id: activeElement.id, text: data },
      });
    }
  };

  return (
    <div className="symbols">
      {symbols[type].map((symbol) => {
        return (
          <button
            key={symbol}
            className="sym-button"
            onClick={() => sendText(symbol)}
          >
            {Parser(convertLatexToMarkup(symbol))}
          </button>
        );
      })}
    </div>
  );
};

export default Symbols;
