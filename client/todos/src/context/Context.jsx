import axios from "axios";
import {
  createContext,
  useReducer,
  useEffect,
  useState,
  useContext,
} from "react";
import TodoContext from "./TodoContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BASE_URL } from "../config/baseUrl";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const res = await axios.get(`${BASE_URL}/user/own`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res?.data) {
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        }
      } catch (error) {
        dispatch({ type: "LOGOUT" });
      }
    };
    checkAuth();
  }, []);

  const signup = async (cred) => {
    try {
      const res = await axios.post(`${BASE_URL}/user/signup`, cred, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch({ type: "SIGNUP_SUCCESS", payload: res.data });
      return res;
    } catch (error) {
      toast.error("Error in signup", error.message);
    }
  };

  const login = async (credentials) => {
    try {
      dispatch({ type: "SET_LOADING" });
      const res = await axios.post(`${BASE_URL}/user/login`, credentials);

      if (res.status === 200) {
        const token = res?.data?.token;
        if (token) {
          localStorage.setItem("token", token);
        }
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: res.data,
          isAuthenticated: true,
        });
        return res;
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        toast.error("Internal Server Error. Please try again later.");
      } else {
        toast.error(error.message);
      }

      dispatch({ type: "LOGOUT" });
      throw error;
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await axios.get(`${BASE_URL}/user/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        localStorage.removeItem("token");
        dispatch({ type: "LOGOUT" });
      }

      toast.success("Logout success");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
