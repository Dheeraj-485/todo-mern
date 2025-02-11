const Todo = require("../model/Todos");

exports.createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    // const { id } = req.user;
    if (!title || !description) {
      return res
        .status(403)
        .json({ message: "title and description is required" });
    }
    const newTodo = new Todo({
      title,
      description,
      userId: req.user.id,
    });
    // console.log("userId", userId);

    const doc = await newTodo.save();

    return res.status(201).json({ message: "Todo created successfully", doc });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating Todo", error: error.message });
  }
};

exports.getAllTodos = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("userId", userId);

    const getAll = await Todo.find({ userId }).populate("userId");
    return res
      .status(200)
      .json({ message: "Fetched all todos", items: getAll });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error getting todos", error: error.message });
  }
};
exports.getSingleTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const find = await Todo.findById(id);
    if (!find) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.json({
      message: " Single Todo fetched successfully",
      todo: {
        title: find.title,
        description: find.description,
        userId: find.userId,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching single Todo", error: error.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const updateTodo = await Todo.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    if (!updateTodo) {
      return res
        .status(404)
        .json({ message: "Todo not found or unauthorized" });
    }
    return res
      .status(200)
      .json({ message: "Todo updated successfully", todo: updateTodo });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating Todo", error: error.message });
  }
};

exports.toggleComplete = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOne({ _id: id });
    if (!todo) {
      return res
        .status(404)
        .json({ message: "Todo not found or unauthorized" });
    }

    todo.completed = !todo.completed; // Toggle true/false
    await todo.save();

    return res
      .status(200)
      .json({ message: "Todo completion status updated", todo });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating completion status",
      error: error.message,
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTodo = await Todo.findOneAndDelete({
      _id: id,
      // userId: req.user.id,
    });

    if (!deletedTodo) {
      return res
        .status(404)
        .json({ message: "Todo not found or unauthorized" });
    }

    return res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting Todo", error: error.message });
  }
};
