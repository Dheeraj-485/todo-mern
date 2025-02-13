import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/Context";
import { useTheme } from "../components/ThemeContext";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

const Login = () => {
  const { login } = useContext(AuthContext);
  const { isDarkMode } = useTheme();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(input);
      if (res?.user) {
        navigate("/");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.log(error);

      console.error(
        "Error during login:",
        error?.response?.data?.message || error.message
      );
      toast.error(
        error?.response?.data?.message || "Login failed! Please try again."
      );
    }
  };

  return (
    <>
      <Navbar />

      <div
        className={`max-h-screen flex items-center p-3  justify-center h-[100vh] ${
          isDarkMode ? "bg-gray-900" : "bg-blue-200"
        } `}
      >
        <div className="w-full  max-w-md p-6 bg-white  rounded-lg shadow-md ">
          <h2 className="text-2xl font-bold mb06 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6 flex-col h-[5rem font-bold">
              <label
                htmlFor="email"
                className="block text-md/6 font-medium text-gray-900"
              >
                Email
              </label>
              <input
                type="text"
                className="w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                name="email"
                placeholder="Enter email..."
                value={input.email}
                onChange={(e) => setInput({ ...input, email: e.target.value })}
              />
            </div>
            <div className="mb-6  flex-col h-[5rem font-bold">
              <label
                htmlFor="pass"
                className="block text-md/6 font-medium text-gray-900"
              >
                Password:
              </label>
              <input
                type="password"
                name="pass"
                className="w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                placeholder="Enter Password..."
                value={input.password}
                onChange={(e) =>
                  setInput({ ...input, password: e.target.value })
                }
              />
            </div>
            <button className="btn btn-primary bg-blue-600 w-full h-cover flex justify-center items-center mx-auto  p-2 rounded-md shadow-lg text-white hover:bg-blue-500 ">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
