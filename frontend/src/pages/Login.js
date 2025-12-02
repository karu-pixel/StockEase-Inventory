import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI / feedback
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const userData = { email, password };

    try {
      const response = await fetch("http://localhost:3001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Login successful! Redirecting...");
        
        // Save token if backend sends one
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        // Redirect after 1.5s
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setError(data.message || "Login failed. Please check credentials.");
      }
    } catch (err) {
      console.error("Network Error:", err);
      setError("Could not reach server. Is backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl flex overflow-hidden">
        
        {/* Left Side (blank panel) */}
        <div className="w-1/2 bg-gray-100 hidden md:block"></div>

        {/* Right side */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-2xl font-semibold mb-1">Welcome to</h1>
          <h1 className="text-3xl font-bold text-indigo-600 mb-6">StockEase</h1>

          {/* Success message */}
          {success && (
            <div className="mb-4 p-3 rounded bg-green-100 text-green-700 text-sm text-center">
              {success}
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 rounded bg-red-100 text-red-700 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="border rounded-xl flex items-center px-4 py-3 bg-gray-50">
              <span className="mr-3 text-gray-500">📧</span>
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none text-sm"
                required
              />
            </div>

            {/* Password */}
            <div className="border rounded-xl flex items-center px-4 py-3 bg-gray-50">
              <span className="mr-3 text-gray-500">🔑</span>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent outline-none text-sm"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="h-4 w-4" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-indigo-500 hover:underline">Forgot Password?</a>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-6 text-center">
            Don't have an account?{" "}
            <a href="/signup" className="text-indigo-600 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
