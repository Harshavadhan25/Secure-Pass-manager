import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard";
import PasswordGenerator from "./pages/PasswordGenerator.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/generator" element={<PasswordGenerator />} />
      </Routes>
    </Router>
  );
}

export default App;
