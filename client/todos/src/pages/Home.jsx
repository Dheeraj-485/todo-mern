import React, { useContext, useEffect } from "react";
import Todos from "./Todos";
import TodoForm from "./TodoForm";
import { useTheme } from "../components/ThemeContext";
import AuthContext from "../context/Context";
import toast from "react-hot-toast";
import axios from "axios";
import Navbar from "../components/Navbar";

const Home = () => {
  const { isDarkMode } = useTheme();

  return (
    <>
      <Navbar />
      <div
        className={`min-h-screen p-4 ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div className="flex flex-col md:flex-row gap-4  justify-center items-center mx-auto  ">
          <div className="p-6 bg-blue-100 rounded-lg shadow-md">
            <TodoForm />
            <Todos />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
