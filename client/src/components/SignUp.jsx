import { useState } from "react";
import axios from "axios";
import { UserPlus } from "lucide-react";

export const SignupForm = ({ onClose, onSignup }) => {
  const [formData, setFormData] = useState({
    type: 'Normal User',
    name: "",
    email: "",
    address: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setApiError("");
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name || formData.name.length < 3) newErrors.name = "Name must be at least 3 characters.";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email format.";
    if (!formData.address || formData.address.length > 400) newErrors.address = "Address max 400 chars.";
    if (
      !formData.password ||
      formData.password.length < 8 ||
      !/[A-Z]/.test(formData.password) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
    )
      newErrors.password = "Password must be 8+ chars with uppercase and special char.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/store_app/sign-up",
        formData
      );

      // Axios resolves only for status codes 2xx
      // The message is in res.data.message
      alert(res.data.message);
      onClose();
    } catch (err) {
      // For non-2xx responses, Axios throws an error
      const message =
        err.response?.data?.message || "Signup failed due to server error.";
      alert(message);
      setApiError(message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white  backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full max-w-md relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          ✕
        </button>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Signup</h2>

        {apiError && <p className="text-red-500 text-center mb-4">{apiError}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Address</label>
            <textarea
              name="address"
              rows="2"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            ></textarea>
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition flex justify-center items-center gap-2"
          >
            {loading ? "Signing up..." : <><UserPlus size={20} /> Signup</>}
          </button>
        </form>
      </div>
    </div>
  );
};
