// src/router/index.js or Router.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../app.jsx";
import Dashboard from "../pages/Dashboard/Form.jsx"; // ✅ corrected import

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Dashboard />} /> {/* ✅ fixed route */}
          {/* Add other nested routes later */}
        </Route>
      </Routes>
    </Router>
  );
}
