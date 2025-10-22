import HeaderGuest from "./components/layoutGuest/Header.jsx";
import { Outlet } from "react-router-dom";

export default function Guest() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <HeaderGuest />
      <main className="flex-1 flex items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
}
