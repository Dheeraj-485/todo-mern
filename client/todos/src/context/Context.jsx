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

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
};

const authReducer = (state, action) => {
  switch (action.type) {
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
        const res = await axios.get("http://localhost:8080/user/own", {
          withCredentials: true,
        });
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      } catch (error) {
        dispatch({ type: "LOGOUT" });
      }
    };
    checkAuth();
  }, [initialState.user, initialState.isAuthenticated]);

  //check login
  const login = async (credentials) => {
    try {
      dispatch({ type: "SET_LOADING" });
      const res = await axios.post(
        "http://localhost:8080/user/login",
        credentials,
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        const token = res?.data?.token;
        if (token) {
          localStorage.setItem("token", token);
        } else {
          console.log("Token not in login");
        }
      }
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

      // fetchTodos();

      console.log("Login details:", res.data);
    } catch (error) {
      console.log("Error", error);

      alert(error.response?.data?.message);
    }
  };

  const logout = async (req, res) => {
    try {
      await axios.post(
        "http://localhost:8080/user/logout",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch({ type: "LOGOUT" });
    } catch (error) {}
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
