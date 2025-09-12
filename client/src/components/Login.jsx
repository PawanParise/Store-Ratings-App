import { useState } from "react";
import axios from "axios";
import { Send } from "lucide-react";

export const LoginForm = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/v1/store_app/login", { email, password });
      console.log("Login Success:", res.data);
      onLogin(res.data.user);
      localStorage.setItem('token',res.data.token)
  
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white   backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full max-w-sm relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          ✕
        </button>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition flex justify-center items-center gap-2"
          >
            {loading ? "Logging in..." : <><Send size={20} /> Login</>}
          </button>
        </form>
      </div>
    </div>
  );
};
