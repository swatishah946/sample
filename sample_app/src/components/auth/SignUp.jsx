import { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    // Add your signup logic here (e.g., API call)
    console.log("Form submitted with:", { email, password });
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
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-input"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                className="form-input"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="form-label" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className="form-input"
                id="confirmPassword"
                type="password"
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
