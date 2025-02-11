const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserRoutes = require("./routes/User");
const todoRoutes = require("./routes/Todos");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend origin
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log("Error connecting to MongoDB", err.message));

app.use("/user", UserRoutes);
app.use("/todo", todoRoutes);
app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
