import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app";

ReactDOM.createRoot(document.getElementById("app")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);