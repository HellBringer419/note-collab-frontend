import { ThemeProvider } from "@/components/theme-provider";
import dayjs from "dayjs";
import relativeTimePlugin from "dayjs/plugin/relativeTime";
import axios from "axios";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginPage from "./components/login-page";
import ForgotPasswordPage from "./components/forgot-password-page";
import RegisterPage from "./components/register-page";
import HomePage from "./components/home-page";
import DashBoard from "./components/dashboard";

axios.defaults.baseURL =
  import.meta.env.REACT_APP_BASE_BACKEND_URL ?? "http://localhost:8080/api/v1/";

dayjs.extend(relativeTimePlugin);

const App = () => {
  return (
    <>
      <Router>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashBoard />} />
          </Routes>
        </ThemeProvider>
      </Router>
    </>
  );
};

export default App;
