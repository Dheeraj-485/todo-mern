import axios from "axios";
import AuthContext from "./Context";

import { createContext, useReducer, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../config/baseUrl";
const TodoContext = createContext();

const initialState = {
  todos: [],
  loading: true,
  error: null,
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: true };
    case "ADD_TODO":
      return {
        ...state,
        // todos: todos.push[action.payload],
        loading: false,
        error: null,
        todos: [...state.todos, action.payload],
      };
    case "REMOVE_TODO":
      console.log("action", action.payload);

      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== action.payload),

        loading: false,
        error: null,
      };

    case "FETCH_TODO":
      return { ...state, todos: action.payload, loading: false, error: null };

    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo._id === action.payload.id ? action.payload : todo
        ),
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo._id === action.payload.id
            ? { ...todo, completed: action.payload.completed }
            : todo
        ),
      };

    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
  }
};

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [editTodo, setEditTodo] = useState(null); //store todo being edited
  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: "SET_LOADING" });

      try {
        const res = await axios.get(`${BASE_URL}/todo/alltodos`, {
          withCredentials: true,
        });
        console.log("Todo res", res.data.items);

        dispatch({ type: "FETCH_TODO", payload: res.data.items });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error.message });
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async (cred) => {
    try {
      const res = await axios.post(`${BASE_URL}/todo/add`, cred, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res) {
        // const data = await res.json();
        console.log("Add todo response:", res?.data?.doc);
        toast.success("todo added successfully", {
          position: "top-right",
        });
        dispatch({ type: "ADD_TODO", payload: res?.data?.doc });
      }
    } catch (error) {
      console.error(
        "Error adding todo:",
        error.response?.data || error.message
      );
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const delTodo = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/todo/${id}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        dispatch({ type: "REMOVE_TODO", payload: id });
      }
    } catch (error) {
      console.error(
        "Error deleting todo",
        error.response?.data || error.message
      );
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const updateTodo = async (id, updatedData) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/todo/update/${id}`,
        updatedData,
        {
          withCredentials: true,
        }
      );

      dispatch({ type: "UPDATE_TODO", payload: res.data.todo });
      toast.success("todo updated successfully");
      setEditTodo(null);
      console.log("Todo resp", res.data.todo);
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/todo/toggle/${id}`,
        {
          completed: !completed,
        },
        { withCredentials: true }
      );

      console.log("Toggle complete response", res.data);

      dispatch({ type: "TOGGLE_TODO", payload: { id, ...completed } });
    } catch (error) {
      console.error("Error toggling todo:", error.message);
      toast.error("Error toggling todo", error.message);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos || [],
        loading: state.loading,
        error: state.error,
        addTodo,
        delTodo,
        updateTodo,
        editTodo,
        setEditTodo,
        toggleTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
