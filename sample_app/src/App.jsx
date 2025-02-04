import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import ForgotPassword from "./components/auth/ForgotPassword";
import LogisticPage from "./pages/logisticPage";
import ProfileDashboard from "./components/logistic_dashboard/ProfileDashboard";
import HelpDashboard from "./components/logistic_dashboard/HelpDashboard";
import LogisticDashboard from "./components/logistic_dashboard/LogisticDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/logidashboard/logistic" />} />

        <Route path="/auth" element={<AuthPage />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        <Route path="/logidashboard" element={<LogisticPage />}>
          <Route path="logistic" element={<LogisticDashboard />} />
          <Route path="profile" element={<ProfileDashboard />} />
          <Route path="help" element={<HelpDashboard />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
