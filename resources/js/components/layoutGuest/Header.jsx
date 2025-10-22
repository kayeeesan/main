import { useState } from "react";
import Login from "../../pages/auth/Login.jsx";
import { User, LogIn, X } from "lucide-react";

export default function HeaderGuest() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left Side - Logo & Welcome */}
            <div className="flex items-center gap-3">
              <img
                src="https://img.freepik.com/premium-vector/queen-girl_1177067-299.jpg?semt=ais_hybrid&w=740&q=80"
                alt="App Logo"
                className="w-8 h-8 rounded-full border-2 border-blue-600"
              />
              <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-l font-medium">KAYE</span>
                </div>
            </div>

            {/* Right Side - Sign In */}
            <button
              onClick={() => setShowLogin(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium px-5 py-2.5 rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-md"
            >
              <LogIn size={16} />
              <span>Sign In</span>
            </button>
          </div>
        </div>
      </header>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 animate-fadeIn">
          <div className="relative animate-scaleIn transition-transform duration-300">
            <div className="absolute -top-2 -right-2 z-10">
              <button
                onClick={() => setShowLogin(false)}
                className="bg-white rounded-full p-1.5 shadow-lg hover:bg-gray-100 transition-colors border border-gray-200"
              >
                <X size={16} className="text-gray-600" />
              </button>
            </div>
            <Login />
          </div>
        </div>
      )}
    </>
  );
}
