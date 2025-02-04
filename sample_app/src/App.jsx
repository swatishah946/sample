import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import AuthPage from "./pages/AuthPage";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import ForgotPassword from "./components/auth/ForgotPassword";
import ShipmentsPage from './pages/ShipmentsPage';
import LoadMatchingPage from './pages/LoadMatchingPage';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/auth/signup">Register</Link>
            </li>
            <li>
              <Link to="/auth/login">Login</Link>
            </li>
            <li>
              <Link to="/shipments">Shipments</Link>
            </li>
            <li>
              <Link to="/load-matching">Load Matching</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/auth/login" />} />
          <Route path="/auth/*" element={<AuthPage />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/shipments" element={<ShipmentsPage />} />
          <Route path="/load-matching" element={<LoadMatchingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
