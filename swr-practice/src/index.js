import React from "react";
// import ReactDOM from 'react-dom'; //구버전
import { createRoot } from "react-dom/client";
import App from "./App";

if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start();
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
