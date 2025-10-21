import { useState } from "react";
import Login from "../pages/Auth/Login";
import useAuth from "../hooks/useAuth";
import { User, LogOut, LogIn, X } from "lucide-react"; // optional icons

export default function Header() {
  const { user, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                <img
                  src="https://img.freepik.com/premium-vector/queen-girl_1177067-299.jpg?semt=ais_hybrid&w=740&q=80"
                  alt="App Logo"
                  className="w-8 h-8 rounded-full"
                />
              </div>
              <div className="flex flex-col justify-center mt-2">
                <h5 className="text-xl font-bold text-gray-900">My React + Laravel App</h5>
              </div>
            </div>

            {/* Right Side */}
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-xl transition-all cursor-pointer group">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">{user.name}</span>
                    <span className="text-xs text-gray-500">Welcome back!</span>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 text-gray-500 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition-all group"
                >
                  <LogOut size={18} />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                <LogIn size={18} />
                <span>Get Started</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
          <div className="relative animate-fadeIn scale-100 transition-transform duration-300">
            <div className="absolute top-3 right-3 z-10">
              <button
                onClick={() => setShowLogin(false)}
                className=" text-black rounded-full p-1.5 hover:bg-red-600 transition"
              >
                <X size={18} />
              </button>
            </div>
            <Login />
          </div>

        </div>
      )}


    </>
  );
}

