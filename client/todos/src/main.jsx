import { createContext, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/Context.jsx";
import { BrowserRouter } from "react-router-dom";
import { TodoProvider } from "./context/TodoContext.jsx";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./components/ThemeContext.jsx";
export const ThemeContext = createContext();

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <AuthProvider>
      <TodoProvider>
        <BrowserRouter>
          <Toaster />
          <App />
        </BrowserRouter>
      </TodoProvider>
    </AuthProvider>
  </ThemeProvider>
);
