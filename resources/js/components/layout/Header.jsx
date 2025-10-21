import { useState } from "react";
import Login from "../../pages/Auth/Login";
import useAuth from "../../hooks/useAuth";
import { User, LogOut, LogIn, X, Menu } from "lucide-react";

export default function Header({ onToggleSidebar, isSidebarCollapsed }) {
  const { user, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  const isUserReady = user && (user.name || user.data?.name);
  const userName = user?.name || user?.data?.name || "Guest";

  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left Side - Sidebar Toggle & User Info */}
            <div className="flex items-center gap-4">
              {/* Sidebar Toggle Button */}
              <button
                onClick={onToggleSidebar}
                className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
                title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <Menu size={20} className="text-gray-600" />
              </button>

              {/* User Info */}
              {isUserReady ? (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-sm">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                  <span className="text-sm font-medium">Welcome, {userName}</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-gray-600">
                  <User size={20} className="text-gray-400" />
                  <span className="text-sm font-medium">Welcome, Guest</span>
                </div>
              )}
            </div>

            {/* Right Side - Auth Actions */}
            {isUserReady ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={logout}
                  className="flex items-center gap-2 text-gray-600 hover:text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition-all duration-200 border border-gray-200 hover:border-red-200"
                >
                  <LogOut size={16} />
                  <span className="text-sm font-medium">Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium px-5 py-2.5 rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-md"
              >
                <LogIn size={16} />
                <span>Sign In</span>
              </button>
            )}
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