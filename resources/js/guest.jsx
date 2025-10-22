import HeaderGuest from "./components/layoutGuest/Header.jsx";
import { Outlet } from "react-router-dom";

export default function Guest() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <HeaderGuest />
      <main className="flex-1 flex items-center justify-center">
        <Outlet /> {/* Optional: placeholder for landing content */}
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil adipisci hic ad unde pariatur atque reprehenderit labore fugit, necessitatibus perspiciatis. Ipsum aut dolore quaerat velit ipsa incidunt eligendi quam possimus.</p>
      </main>
    </div>
  );
}
