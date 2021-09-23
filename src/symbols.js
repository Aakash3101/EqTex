import React from "react";
import { convertLatexToMarkup } from "mathlive";
import { symbols } from "./mathsymbols";
import Parser from "html-react-parser";

const Symbols = ({ type }) => {
  const sendText = (data) => {};
  return (
    <div className="symbols">
      {symbols[type].map((symbol, index) => {
        console.log(symbol);
        return (
          <button
            key={index}
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
