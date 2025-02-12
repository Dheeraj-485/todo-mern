import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/Context";
import { useTheme } from "./ThemeContext";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      toast.error("Error in logout", error.message);
    }
  };
  // useEffect(() => {}, [isAuthenticated]);

  return (
    <nav
      className={`sticky top-0 shadow-md p-4 ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-blue-300 text-black"
      }`}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link to="/">
          <div className="text-lg font-bold">Todo APP</div>
        </Link>

        <ul className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 font-medium">
          {/* {!user && (
            <>
              <Link to="/signup">
                <li className="hover:text-gray-200 transition duration-300 cursor-pointer">
                  Signup
                </li>
              </Link>
              <Link to="/login">
                <li className="hover:text-gray-200 transition duration-300 cursor-pointer">
                  Login
                </li>
              </Link>
            </>
          )}
          {isAuthenticated && (
            <Link to="/dashboard">
              <li className="hover:text-gray-200 transition duration-300 cursor-pointer">
                Dashboard
              </li>
            </Link>
          )}
          {isAuthenticated && (
            <Link to="/Login">
              <button
                className="bg-red-500 px-3 py-1 rounded-xl hover:bg-red-600 "
                // className="hover:text-gray-200 transition duration-300 cursor-pointer bg-red-700 p-2 rounded-2xl "
                onClick={handleLogout}
              >
                Logout
              </button>
            </Link>
          )} */}

          {!isAuthenticated ? (
            <>
              <Link to="/signup">
                <li>Signup</li>
              </Link>
              <Link to="/login">
                <li>Login</li>
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard">
                <li>Dashboard</li>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded-xl hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-700 transition duration-300"
          >
            {isDarkMode ? "🌙" : "☀️"}
          </button>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
