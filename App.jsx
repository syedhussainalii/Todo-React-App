import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = () => {
    setShowFinished((prev) => !prev);
  };

  const handleEdit = (e, id) => {
    const t = todos.find((i) => i.id === id);
    setTodo(t.todo);
    setEditId(id);
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (confirmDelete) {
      const newTodos = todos.filter((item) => item.id !== id);
      setTodos(newTodos);
      saveToLS();
    }
  };

  const handleAdd = () => {
    if (editId) {
      setTodos([...todos, { id: editId, todo, isCompleted: false }]);
      setEditId(null);
    } else {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    }
    setTodo("");
    saveToLS();
  };

  const handleOnchange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const newTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <>
      <Navbar />
      <div className="md:container mx-3 md:mx-auto my-5 rounded-xl bg-violet-100 p-5 min-h-[80vh] md:w-[35%]">
        <h1 className="font-bold text-center text-2xl">
          iTask - Manage your todos at one place.{" "}
        </h1>
        <div className="addTodo flex flex-col items-center">
          <h2 className="text-2xl font-bold my-5">Add a Todo</h2>
          <input
            onChange={handleOnchange}
            value={todo}
            type="text"
            className="w-full mb-5 rounded-lg px-5 py-1"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className="bg-violet-800 disabled:bg-blue-600 hover:bg-violet-800 text-white text-sm font-bold px-3 py-1 rounded-md w-full gap flex justify-center items-center"
          >
            {" "}
            {editId ? "Update" : "Save"}
          </button>
        </div>
        <input
          className="my-4"
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
        />{" "}
        <label className="mx-2" htmlFor="show">
          Show Finished
        </label>
        <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2"></div>
        <h2 className="text-xl font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos to display</div>}
          {todos
            .filter((item) => !showFinished || item.isCompleted)
            .map((item) => (
              <div key={item.id} className="todo flex my-3 justify-between">
                <div className="flex gap-5">
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                    className="mr-2"
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex h-yy h-1/2">
                  <button
                    onClick={(e) => handleEdit(e, item.id)}
                    className="bg-violet-800 hover:bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-md mx-1"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, item.id)}
                    className="bg-violet-800 hover:bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-md mx-1"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
