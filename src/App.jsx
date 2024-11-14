import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import SignUpPage from "./pages/Auth/SignUpPage";
import LoginPage from "./pages/Auth/LoginPage";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import ForgetPassword from "./components/forget-password/forgetPassword";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        {/* public Route */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;
