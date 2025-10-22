import { useState, useEffect } from "react";
import {
  Home,
  BarChart2,
  Settings,
  UserPlus,
  ChevronRight,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

export default function Sidebar({ isCollapsed, onToggle }) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/dashboard" },
    { name: "Reports", icon: <BarChart2 size={20} />, path: "/reports" },
    {
      name: "Settings",
      icon: <Settings size={20} />,
      children: [
        { name: "Add User", icon: <UserPlus size={16} />, path: "/settings/add-user" },
      ],
    },
  ];

  // Automatically open settings if inside settings route
  const isInsideSettings = navItems
    .find((item) => item.name === "Settings")
    ?.children?.some((child) => location.pathname.startsWith(child.path));

  useEffect(() => {
    if (isInsideSettings) {
      setSettingsOpen(true);
    }
  }, [isInsideSettings]);

  return (
    <>
      {/* Sidebar Overlay for Mobile */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 shadow-lg transform transition-all duration-300 z-50
          ${isCollapsed ? "w-20" : "w-64"} 
          ${!isCollapsed ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Header / Logo */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-700 to-purple-700 text-white shadow-md h-16">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src="https://img.freepik.com/premium-vector/queen-girl_1177067-299.jpg?semt=ais_hybrid&w=740&q=80"
              alt="App Logo"
              className="w-8 h-8 rounded-full border-2 border-white flex-shrink-0"
            />
            {!isCollapsed && (
              <div className="min-w-0 flex-1">
                <h5 className="font-semibold text-sm leading-tight truncate">
                  My React App
                </h5>
                <p className="text-xs opacity-80 truncate">Admin Dashboard</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isParentActive = item.children?.some((child) =>
              location.pathname.startsWith(child.path)
            ) ?? false;

            return (
              <div key={item.name}>
                {!item.children ? (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-3 rounded-lg transition-all group ${
                        isActive
                          ? "bg-blue-50 text-blue-700 font-semibold border border-blue-100"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      } ${isCollapsed ? "justify-center" : ""}`
                    }
                    title={isCollapsed ? item.name : ""}
                  >
                    <div className={`${isCollapsed ? "" : "p-1"}`}>
                      {item.icon}
                    </div>
                    {!isCollapsed && (
                      <span className="text-sm font-medium">{item.name}</span>
                    )}
                  </NavLink>
                ) : (
                  <div>
                    <button
                      onClick={() => setSettingsOpen(!settingsOpen)}
                      className={`flex items-center w-full px-3 py-3 rounded-lg transition-all group ${
                        isParentActive
                          ? "bg-blue-50 text-blue-700 font-semibold border border-blue-100"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      } ${isCollapsed ? "justify-center" : ""}`}
                      title={isCollapsed ? item.name : ""}
                    >
                      <div className={`${isCollapsed ? "" : "p-1"}`}>
                        {item.icon}
                      </div>
                      {!isCollapsed && (
                        <>
                          <span className="text-sm font-medium flex-1 text-left">
                            {item.name}
                          </span>
                          <ChevronRight
                            size={16}
                            className={`transform transition-transform ${
                              settingsOpen ? "rotate-90" : ""
                            }`}
                          />
                        </>
                      )}
                    </button>

                    {/* Child items */}
                    {settingsOpen && !isCollapsed && (
                      <div className="ml-6 mt-1 space-y-1 border-l border-gray-200 pl-3">
                        {item.children.map((child) => (
                          <NavLink
                            key={child.name}
                            to={child.path}
                            className={({ isActive }) =>
                              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                                isActive
                                  ? "text-blue-600 font-medium bg-blue-50"
                                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                              }`
                            }
                          >
                            {child.icon}
                            <span>{child.name}</span>
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className="absolute bottom-0 w-full px-4 py-3 border-t border-gray-200 bg-white">
            <p className="text-xs text-gray-500 text-center">
              © {new Date().getFullYear()} MyApp v1.0
            </p>
          </div>
        )}
      </aside>
    </>
  );
}