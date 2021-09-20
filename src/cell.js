import React, { useState, useEffect, useRef } from "react";
import "mathlive";

const Cell = ({ order, content, add, remove }) => {
  const [latex, setLatex] = useState(content);
  const outputRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.addEventListener("input", (ev) => {
      outputRef.current.value = ev.target.value;
      setLatex(ev.target.value);
    });
    outputRef.current.addEventListener("input", (ev) => {
      inputRef.current.value = ev.target.value;
      setLatex(ev.target.value);
    });
  }, [outputRef, inputRef]);

  return (
    <div className="cell">
      <textarea
        className="output"
        placeholder="Markdown"
        rows="3"
        style={{ width: "97%" }}
      />
      <math-field ref={inputRef}>{latex}</math-field>
      <div className="button-grid">
        <textarea
          className="output"
          placeholder="Your Latex output here"
          rows="5"
          ref={outputRef}
        />
        <div className="buttons">
          <button className="add" onClick={add}>
            +
          </button>
          <button className="delete" onClick={() => remove(order)}>
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cell;
