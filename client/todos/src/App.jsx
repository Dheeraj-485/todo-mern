import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar.jsx";
import Todos from "./pages/Todos.jsx";
import { useTheme } from "./components/ThemeContext.jsx";
// import { useTheme } from "styled-components";

const App = () => {
  const { isDarkMode } = useTheme;
  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
    </div>
  );
};

export default App;
