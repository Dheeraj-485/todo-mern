const mongoose = require("mongoose");
const todosSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  // description: {
  //   type: String,
  //   required: true,
  // },
  completed: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

const Todo = new mongoose.model("Todos", todosSchema);
module.exports = Todo;
