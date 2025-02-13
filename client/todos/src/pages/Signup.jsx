import { useContext, useState } from "react";
import { useTheme } from "../components/ThemeContext";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/Context";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

const Signup = () => {
  const { isDarkMode } = useTheme();
  const { signup } = useContext(AuthContext);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(data);

      // console.log("Response:", response.data);

      if (res && res.data) {
        toast.success(res?.data?.message);
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        toast.error("Error: " + error.res?.data.message);
        console.error("Signup Error:", error.response.data.message);
      } else {
        console.error("Unexpected Error:", error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDarkMode ? "bg-gray-900" : "bg-blue-200"
        }`}
      >
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form">
              <div className="flex flex-col h-[5rem] font-bold mb-2   ">
                <label
                  htmlFor="name"
                  className="block text-md/6 font-medium text-gray-900"
                >
                  Name:
                </label>
                <input
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter Name..."
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
              </div>
              <div className="flex flex-col h-[4rem] text-md/6 font-medium mb-2 ">
                <label
                  htmlFor="email"
                  className="block text-md/6 font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Email..."
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>
              <div className="flex flex-col text h-[4rem] font-bold mb-2">
                <label
                  htmlFor="password"
                  className="block text-md/6 font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter Password..."
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
