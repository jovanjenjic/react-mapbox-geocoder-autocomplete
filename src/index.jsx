import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <div style={{ height: '400px', width: '100%' }}>
      <App mapToken="pk.eyJ1Ijoiam92YW5qZW5qaWMiLCJhIjoiY2wzdWJvNG4wMGZ2YjNkcGZ2dm5kZm5nYyJ9.9bCbz74PqDnzQDpBqRenHw" />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
