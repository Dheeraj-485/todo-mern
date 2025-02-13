import React, { useContext, useEffect } from "react";
import AuthContext from "../context/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config/baseUrl";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  console.log("user:", user);
  console.log("isAuthenticated:", isAuthenticated);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      await axios.get(`${BASE_URL}/user/own`, {
        withCredentials: true,
      });
      //   if (!isAuthenticated) {
      //     navigate("/login");
      //   }
    };
    fetchProfile();
  }, []);

  if (!user) {
    return <h2>Loading Dashboard...</h2>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-500 text-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4">
              Welcome, {user.user.email}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
