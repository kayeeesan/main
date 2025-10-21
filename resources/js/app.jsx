import './bootstrap';
import Header from './components/Header';
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap styles
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // JS (for dropdowns, modals, etc.)
import "../css/app.css";


export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="p-6">
        <h2 className="text-2xl font-semibold">Welcome to React + Laravel!</h2>
      </main>
    </div>
  );
}
