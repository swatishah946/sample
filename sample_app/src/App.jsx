import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import DashPage from "./pages/DashPage"; // Import DashPage here
import LogisticPage from "./pages/logisticPage";

import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import ForgotPassword from "./components/auth/ForgotPassword";
import MSMEDashboard from "./components/dashboard/MSMEDashboard";
import ProfileDashboard from "./components/dashboard/ProfileDashboard";
import HelpDashboard from "./components/dashboard/HelpDashboard";

import LogiProfileDashboard from "./components/logistic_dashboard/ProfileDashboard";
import LogiHelpDashboard from "./components/logistic_dashboard/HelpDashboard";
import LogisticDashboard from "./components/logistic_dashboard/LogisticDashboard";

import AdminDashboard from "./components/admin_dashboard/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route to login */}
        {/* <Route path="/" element={<Navigate to="/logidashboard/logistic" />} /> */}
        {/* <Route path="/" element={<Navigate to="/dashboard/msme" />} /> */}
        <Route path="/" element={<Navigate to="/admin_dashboard" />} />
        {/* Authentication Pages */}

        <Route path="/auth" element={<AuthPage />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Dashboard Pages */}
        <Route path="/dashboard" element={<DashPage />}>
          <Route path="msme" element={<MSMEDashboard />} />
          <Route path="profile" element={<ProfileDashboard />} />
          <Route path="help" element={<HelpDashboard />} />
        </Route>

        <Route path="/logidashboard" element={<LogisticPage />}>
          <Route path="logistic" element={<LogisticDashboard />} />
          <Route path="logiprofile" element={<LogiProfileDashboard />} />
          <Route path="logihelp" element={<LogiHelpDashboard />} />
        </Route>

        <Route path="/admin_dashboard" element={<AdminDashboard/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
