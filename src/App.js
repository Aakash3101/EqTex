import React from "react";
import Title from "./title.js";
import Sidebar from "./sidebar.js";
import Workspace from "./workspace.js";

function App() {
  return (
    <>
      <Title />
      <div className="grid-container">
        <Sidebar />
        <Workspace />
      </div>
    </>
  );
}

export default App;
