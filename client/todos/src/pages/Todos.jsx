import React, { useContext } from "react";
import TodoContext from "../context/TodoContext";
import { RiDeleteBin6Fill } from "react-icons/ri";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useTheme } from "../components/ThemeContext";

const Todos = () => {
  const { todos, delTodo, editTodo, setEditTodo, toggleTodo } =
    useContext(TodoContext);
  const { isDarkMode } = useTheme();

  const handleComplete = async (id, completed) => {
    try {
      await toggleTodo(id, completed);
    } catch (error) {
      console.error("Error toggling todo:", error.message);
      toast.error("error toggling todo", error.message);
    }
  };

  return (
    <div className="container mx-auto my-4 p-3">
      {todos.length > 0 ? (
        todos.map((todo) => (
          <div
            key={todo._id}
            className={`flex justify-between items-center m-3 p-4 rounded-lg shadow-md ${
              isDarkMode ? "bg-gray-700 text-white" : "bg-purple-100"
            }`}
          >
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleComplete(todo._id, todo.completed)}
                className="w-5 h-5"
              />
              <p
                className={`text-lg font-bold ${
                  todo.completed
                    ? "line-through text-gray-500 font-extralight"
                    : "text-gray-900"
                } `}
              >
                {todo.title}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setEditTodo(todo)}
                className="p-1 text-blue-600 hover:text-blue-800"
              >
                Edit
              </button>
              <button
                onClick={() => delTodo(todo._id)}
                className="p-1 text-red-600 hover:text-red-800"
              >
                <RiDeleteBin6Fill />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No todos found</p>
      )}
    </div>
  );
};

export default Todos;
