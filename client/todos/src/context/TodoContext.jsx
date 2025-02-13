import axios from "axios";
import AuthContext from "./Context";

import {
  createContext,
  useReducer,
  useEffect,
  useState,
  useContext,
} from "react";
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
        loading: false,
        error: null,
        todos: [...state.todos, action.payload],
      };
    case "REMOVE_TODO":
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
          todo._id === action.payload._id ? action.payload : todo
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
    default:
      return state;
  }
};

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const { isAuthenticated } = useContext(AuthContext);
  const [editTodo, setEditTodo] = useState(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchTodos = async () => {
      dispatch({ type: "SET_LOADING" });
      try {
        const res = await axios.get(`${BASE_URL}/todo/alltodos`, {
          headers: getAuthHeaders(),
        });
        dispatch({ type: "FETCH_TODO", payload: res.data.items });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error.message });
      }
    };
    fetchTodos();
  }, [isAuthenticated]);

  const addTodo = async (cred) => {
    try {
      const res = await axios.post(`${BASE_URL}/todo/add`, cred, {
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      });
      dispatch({ type: "ADD_TODO", payload: res?.data?.doc });
      toast.success("Todo added successfully");
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const delTodo = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/todo/${id}`, {
        headers: getAuthHeaders(),
      });
      if (res.status === 200) {
        dispatch({ type: "REMOVE_TODO", payload: id });
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const updateTodo = async (id, updatedData) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/todo/update/${id}`,
        updatedData,
        {
          headers: getAuthHeaders(),
        }
      );
      dispatch({
        type: "UPDATE_TODO",
        payload: { ...res.data.todo, id: res.data.todo._id },
      });
      toast.success("Todo updated successfully");
      setEditTodo(null);
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/todo/toggle/${id}`,
        { completed: !completed },
        { headers: getAuthHeaders() }
      );
      dispatch({
        type: "TOGGLE_TODO",
        payload: { id, completed: res.data.todo.completed },
      });
    } catch (error) {
      toast.error("Error toggling todo");
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
