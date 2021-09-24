import React, { useState, useEffect, useRef, useContext } from "react";
import "mathlive";
import MDEditor from "@uiw/react-md-editor";
import { CellContext } from "./App";

const MDtitle = ({ title }) => {
  const [value, setValue] = useState(title);
  const [display, setDisplay] = useState(false);
  function showEditor() {
    if (display === false) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  }
  return (
    <div className="container">
      {display ? <MDEditor value={value} onChange={setValue} /> : <p />}
      <div>
        <MDEditor.Markdown
          source={value}
          className="markdown"
          style={{ color: "white", margin: "1em" }}
        />
        <div align="right">
          <button onClick={showEditor} style={{ marginRight: "1rem" }}>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

const Cell = ({ index, add, remove }) => {
  const cellContext = useContext(CellContext);
  const order = cellContext.state.cells[index].id;
  const title = cellContext.state.cells[index].title;
  const content = cellContext.state.cells[index].defaultContent;
  const [latex, setLatex] = useState(content);
  const outputRef = useRef("");
  const inputRef = useRef("");
  const inputChange = (ev) => {
    outputRef.current.value = ev.target.value;
    setLatex(ev.target.value);
  };

  useEffect(() => {
    inputRef.current.addEventListener("input", inputChange);
    cellContext.dispatch({
      type: "SET",
      payload: { index, text: inputRef.current.value },
    });
    console.log(cellContext.state.cells[index]);
    setLatex(() => {
      return cellContext.state.cells[index].defaultContent;
    });
  }, [latex]);

  return (
    <div className="cell">
      <MDtitle title={title} />
      <math-field ref={inputRef} id={order}>
        {latex}
      </math-field>
      <div className="button-grid">
        <textarea
          data-provide="markdown"
          className="output"
          placeholder="Your Latex output here"
          rows="5"
          ref={outputRef}
          onChange={(ev) => (inputRef.current.value = ev.target.value)}
        />
        <div className="buttons">
          <button className="add" onClick={add}>
            <img
              src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/plus-512.png"
              alt="add-button"
              style={{
                height: "1.5rem",
              }}
            />
          </button>
          <button className="delete" onClick={() => remove(order)}>
            <img
              src="https://cdn4.iconfinder.com/data/icons/eon-ecommerce-i-1/32/trashcan_delete_remove-128.png"
              alt="delete-button"
              style={{ height: "1.5rem" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cell;
