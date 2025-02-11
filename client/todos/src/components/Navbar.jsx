import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/Context";
import { useTheme } from "./ThemeContext";
import axios from "axios";

const Navbar = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    try {
      const res = await axios.get("http://localhost:8080/user/logout", {
        withCredentials: true,
      });
      // navigate("/login");
    } catch (error) {}
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
          {!user && (
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

// //new
// import React, { useContext, useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import AuthContext from "../context/Context";
// import toast from "react-hot-toast";
// import { useTheme } from "./ThemeContext";

// const Navbar = () => {
//   const { isAuthenticated, user, logout } = useContext(AuthContext);
//   const [isLoaded, setIsLoaded] = useState(false); // ✅ Prevent flickering
//   const navigate = useNavigate();
//   const { isDarkMode, toggleDarkMode } = useTheme();
//   //   const navigate = useNavigate();

//   useEffect(() => {
//     setIsLoaded(true); // ✅ Trigger re-render when user updates
//   }, [user, isAuthenticated]);

//   const handleLogout = async (e) => {
//     try {
//       const res = await axios.get("http://localhost:8080/user/logout", {
//         withCredentials: true,
//       });
//       // navigate("/login");
//       console.log("Clicked");
//     } catch (error) {
//       toast.error("Error logging out", error.message);
//     }
//   };

//   return (
//     <nav className="bg-gray-900 text-white p-4 shadow-md sticky top-0">
//       <div className="container mx-auto flex justify-between items-center">
//         <Link to="/" className="text-lg font-bold">
//           Todo APP
//         </Link>

//         <ul className="flex space-x-6">
//           <Link to="/" className="hover:text-gray-300">
//             Home
//           </Link>
//           {isAuthenticated ? (
//             <>
//               <Link to="/dashboard" className="hover:text-gray-300">
//                 Dashboard
//               </Link>
//               <button
//                 className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
//                 onClick={handleLogout}
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link to="/signup" className="hover:text-gray-300">
//                 Signup
//               </Link>
//               <Link to="/login" className="hover:text-gray-300">
//                 Login
//               </Link>
//             </>
//           )}
//           <button
//             onClick={toggleDarkMode}
//             className="p-2 rounded-full hover:bg-gray-700 transition duration-300"
//           >
//             {isDarkMode ? "🌙" : "☀️"}
//           </button>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
