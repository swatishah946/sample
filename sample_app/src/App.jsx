import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import ForgotPassword from "./components/auth/ForgotPassword";
import DashPage from "./pages/DashPage";
import ProfileDashboard from "./components/dashboard/ProfileDashboard";
import HelpDashboard from "./components/dashboard/HelpDashboard";
import LogisticDashboard from "./components/dashboard/LogisticDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard/logistic" />} />

        <Route path="/auth" element={<AuthPage />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        <Route path="/dashboard" element={<DashPage />}>
          <Route path="logistic" element={<LogisticDashboard />} />
          <Route path="profile" element={<ProfileDashboard />} />
          <Route path="help" element={<HelpDashboard />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
