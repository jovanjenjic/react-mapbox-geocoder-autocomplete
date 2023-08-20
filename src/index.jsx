import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const MAP_TOKEN = process.env.REACT_APP_MAP_TOKEN;

ReactDOM.render(
  <React.StrictMode>
    <div style={{ height: '400px', width: '100%' }}>
      <App mapToken={MAP_TOKEN} />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
