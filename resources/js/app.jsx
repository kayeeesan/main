import './bootstrap';
import Header from './components/Header';

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
