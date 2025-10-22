import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "../js/router/Router.jsx"; 

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
    <AppRouter /> {/* ✅ render the router, not App */}
  </React.StrictMode>
);