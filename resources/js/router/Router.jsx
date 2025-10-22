import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

// Layouts
import App from "../app.jsx";     
import Guest from "../guest.jsx"; 

// Authenticated Pages
import Dashboard from "../pages/Dashboard/Form.jsx";

const isAuthenticated = () => !!localStorage.getItem("token");

function GuardedRoute({ children}) {
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
        <Route path="/" element={<Guest />} /> {/* Just one route since login is a dialog */}

        {/* 🔐 Authenticated Layout */}
        <Route
          path="/dashboard"
          element={
            <GuardedRoute>
              <App />
            </GuardedRoute>
          }
        >
          <Route index element={<Dashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
