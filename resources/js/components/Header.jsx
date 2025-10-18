import { useState } from "react";
import Login from "../pages/Login";
import useAuth from "../hooks/useAuth";

export default function Header() {
  const { user, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">My React + Laravel App</h1>

      {user ? (
        <div className="flex gap-2 items-center">
          <span>{user.name}</span>
          <button
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      ) : (
        <>
          <button
            className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>

          {showLogin && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="relative">
                <Login />
                <button
                  onClick={() => setShowLogin(false)}
                  className="absolute top-2 right-2 text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </header>
  );
}
