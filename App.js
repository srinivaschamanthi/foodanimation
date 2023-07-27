import React from "react";
import ReactDOM from "react-dom/client";
const heading = React.createElement(
  "h1",
  {
    id: "title",
    style: {
      background: "green",
    },
    className: "title",
  },
  "chamanthi"
);
const heading1 = React.createElement(
  "h1",
  {
    id: "title",
  },
  "srinivas"
);

const container = React.createElement(
  "div",
  {
    id: "container",
  },
  [heading, heading1]
);

// create root using createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));
// passing react element inside root
root.render(container);
