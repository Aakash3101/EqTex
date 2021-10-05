import React, { useState, useEffect } from "react";
import { convertLatexToMarkup } from "mathlive";
import { symbols } from "./mathsymbols";
import Parser from "html-react-parser";

const Buttons = React.memo(({ type, sendText }) => {
  return (
    <>
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
    </>
  );
});

const Symbols = ({ type }) => {
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
      activeElement.insert(data);
    }
  };

  return (
    <div className="symbols">
      <Buttons type={type} sendText={sendText} />
    </div>
  );
};

export default React.memo(Symbols);
