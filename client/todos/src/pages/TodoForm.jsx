import React, { useContext, useEffect, useState } from "react";
import TodoContext from "../context/TodoContext";
import AuthContext from "../context/Context";
import toast from "react-hot-toast";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const { addTodo, todos, editTodo, setEditTodo, updateTodo } =
    useContext(TodoContext);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (editTodo) {
      setTitle(editTodo.title);
    }
  }, [editTodo]);

  const handleSubmit = async (e) => {
    if (!title.trim()) return;
    if (editTodo) {
      await updateTodo(editTodo._id, { title });
    } else {
      const newTodo = {
        //   id: 1,

        title: title,
      };

      await addTodo(newTodo);
      if (!isAuthenticated) {
        toast.error("Please login first:");
      }
      setTitle("");
    }
  };

  return (
    <div className=" font-semibold text-2xl container flex justify-center space-x-3 items-center  mx-auto mt-3 h-15  rounded-2xl">
      <input
        className=" h-12 bg-blue-50 text-black
                 items-center rounded-md shadow-lg p-2 focus:ring-2 focus:ring-blue-300 outline-none
         "
        type="text"
        placeholder="Enter a todo..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="p-2.5 m-2 rounded-2xl bg-sky-300 text-white hover:bg-sky-600 outline-none"
      >
        {editTodo ? "Update" : "Add"}
      </button>
      {editTodo && (
        <button
          className="p-2.5 m-2 rounded-2xl bg-red-300 text-white hover:bg-red-600"
          onClick={() => {
            setEditTodo(null);
            setTitle(null);
          }}
        >
          Cancel
        </button>
      )}
    </div>
  );
};

export default TodoForm;
