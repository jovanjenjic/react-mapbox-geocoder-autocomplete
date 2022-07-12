import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "mapbox-gl/src/css/mapbox-gl.css";
import "react-resizable/css/styles.css";
import "antd/dist/antd.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
