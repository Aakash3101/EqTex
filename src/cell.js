import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
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
  const inputRef = useRef(content);
  const [copy, setCopy] = useState(false);

  const setContent = useCallback((ev) => {
    cellContext.dispatch({
      type: "SET",
      payload: { order, text: ev.target.value },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    inputRef.current.addEventListener("input", setContent);
  });

  return (
    <div className="cell">
      <MDtitle title={title} />
      <math-field ref={inputRef} id={order} smart-fence>
        {content}
      </math-field>
      <div className="button-grid">
        <textarea
          // data-provide="markdown"
          className="output"
          placeholder="Your Latex output here"
          rows="4"
          value={content}
          onChange={(ev) => {
            setContent(ev);
            inputRef.current.value = ev.target.value;
          }}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
        />
        <div className="buttons">
          <div className="tooltip">
            <button
              className="copy_paste"
              title="Clipboard"
              onClick={() => {
                navigator.clipboard.writeText(inputRef.current.value);
                setCopy(true);
                setTimeout(() => {
                  setCopy(false);
                }, 1000);
              }}
            >
              {copy ? <span className="tooltiptext">Copied!</span> : null}
              <img
                src="https://cdn1.iconfinder.com/data/icons/soccer-football-6/512/N_T_517Artboard_1_copy_13-128.png"
                alt="copy to clipboard"
                style={{
                  height: "1.5rem",
                }}
              />
            </button>
          </div>
          <button className="add" title="Add new cell" onClick={add}>
            <img
              src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/plus-512.png"
              alt="add-button"
              style={{
                height: "1.5rem",
              }}
            />
          </button>
          <button
            className="delete"
            title="Delete current cell"
            onClick={() => remove(order)}
          >
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
