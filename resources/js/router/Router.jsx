import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

// Layouts
import App from "../app.jsx";
import Guest from "../guest.jsx";

// Authenticated Pages
import Dashboard from "../pages/Dashboard/Form.jsx";
import Reports from "../pages/Reports/Form.jsx";
import User from "../pages/User/Form.jsx";

const isAuthenticated = () => !!localStorage.getItem("token");

function GuardedRoute({ children }) {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  return children;
}

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* 🧍 Guest Layout */}
        <Route path="/" element={<Guest />} />

        {/* 🔐 Authenticated Layout */}
        <Route
          path="/"
          element={
            <GuardedRoute>
              <App />
            </GuardedRoute>
          }
        >
          {/* ✅ Nested protected routes */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings/add-user" element={<User />} />
        </Route>

        {/* 🚫 Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
