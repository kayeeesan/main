import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Loader2 } from "lucide-react";

export default function Login() {
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8 mx-auto border border-gray-100">
      {/* Logo or title */}
      <div className="text-center mb-6">
        <img
          src="https://img.freepik.com/premium-vector/queen-girl_1177067-299.jpg?semt=ais_hybrid&w=740&q=80"
          alt="Logo"
          className="w-14 h-14 rounded-full mx-auto mb-2"
        />
        <h2 className="text-2xl font-semibold text-gray-800">Welcome Back</h2>
        <p className="text-gray-500 text-sm">Please sign in to continue</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1 block">Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-all shadow-sm"
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>

        {error && (
          <p className="text-red-500 text-sm text-center mt-1">{error}</p>
        )}
      </form>

      {/* Footer */}
      <p className="text-center text-gray-500 text-xs mt-6">
        © {new Date().getFullYear()} My React + Laravel App
      </p>
    </div>
  );
}
