import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("MSME"); // Default role selection
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");

    // Simulating sign-up (replace with actual API call)
    localStorage.setItem("newUser", JSON.stringify({ email, role }));

    // Redirect to Login Page
    navigate("/auth/login");
  };

  return (
    <div className="auth-card">
      <div className="auth-card-header">
        <h2 className="text-2xl font-semibold text-gray-700">Sign Up</h2>
      </div>
      <div className="auth-card-body">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="form-label">Select Role</label>
              <select
                className="form-input"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="MSME">MSME</option>
                <option value="Provider">Provider</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div>
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="input-error">{error}</p>}

            <button type="submit" className="btn-primary">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;