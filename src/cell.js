import React, { useState, useEffect, useRef } from "react";
import "mathlive";
import MDEditor from "@uiw/react-md-editor";

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

const Cell = ({ order, content, title, add, remove }) => {
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
      {/* <textarea
        className="output"
        placeholder="Title"
        rows="3"
        style={{ width: "97%" }}
      /> */}
      <MDtitle title={title} />
      <math-field ref={inputRef}>{latex}</math-field>
      <div className="button-grid">
        <textarea
          data-provide="markdown"
          className="output"
          placeholder="Your Latex output here"
          rows="5"
          ref={outputRef}
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
