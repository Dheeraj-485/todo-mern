import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useTheme } from "./ThemeContext";
import TodoContext from "../context/TodoContext";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { cleartodo } = useContext(TodoContext);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    cleartodo();
    setIsLoggedIn(false);

    navigate("/login");
  };

  return (
    <nav
      className={`sticky top-0 shadow-md p-4 flex justify-between ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-blue-300 text-black"
      }`}
    >
      <Link to="/" className="text-xl font-bold">
        MyTodo
      </Link>
      <div>
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className="mr-4">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signup" className="mr-4">
              Signup
            </Link>
            <Link to="/login" className="bg-blue-500 px-3 py-1 rounded">
              Login
            </Link>
          </>
        )}

        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-700 transition duration-300"
        >
          {isDarkMode ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
