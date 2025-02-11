const express = require("express");
const { isAuth } = require("../middlewares/checkAuth");
const {
  createTodo,
  getAllTodos,
  getSingleTodo,
  updateTodo,
  deleteTodo,
  toggleComplete,
} = require("../controller/Todos");
const router = express.Router();

router
  .post("/add", isAuth, createTodo)
  .get("/alltodos", isAuth, getAllTodos)
  .get("/:id", isAuth, getSingleTodo)
  .put("/update/:id", isAuth, updateTodo)
  .delete("/:id", isAuth, deleteTodo)
  .put("/toggle/:id", isAuth, toggleComplete);

module.exports = router;
