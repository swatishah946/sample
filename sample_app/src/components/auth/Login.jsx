import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="auth-card">
      <div className="auth-card-header">
        <h2 className="text-xl font-semibold text-gray-900 text-center">
          Login to EaseLogi
        </h2>
      </div>
      <div className="auth-card-body">
        <form>
          <div>
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Forgot Password - Positioned to Top Right */}
          <div className="flex justify-end mt-2">
            <Link
              to="/auth/forgot-password"
              className="text-blue-600 text-sm hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button type="submit" className="btn-primary mt-10 w-full">
            Login
          </button>
        </form>

        {/* Signup Link - Centered */}
        <div className="text-center mt-4">
          <span className="text-gray-600">Dont have an account? </span>
          <Link
            to="/auth/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
