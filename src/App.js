import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from './SignUpPage';
import LoginPage from "./LoginPage";
import DashboardPage from "./DashboardPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
};

export default App;
