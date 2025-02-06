import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import ForgotPassword from "./components/auth/ForgotPassword";
import DashPage from "./pages/DashPage";
import MSMEDashboard from "./components/dashboard/MSMEDashboard";
import ProfileDashboard from "./components/dashboard/ProfileDashboard";
import HelpDashboard from "./components/dashboard/HelpDashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute"; // Import ProtectedRoute

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" />} />

        {/* Authentication Pages */}
        <Route path="/auth" element={<AuthPage />}>
          <Route index path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route path="msme" element={<MSMEDashboard />} />
          <Route path="profile" element={<ProfileDashboard />} />
          <Route path="help" element={<HelpDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
