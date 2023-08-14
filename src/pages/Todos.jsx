import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../server";
import { toast } from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
import "../styles/todo.css";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const Todos = () => {
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [text, setText] = useState("");
  const [popupActive, setPopupActive] = useState(false);
  const { isAuthenticated } = useContext(Context);

  // Update Task Handler
  const updateTask = async (id) => {
    try {
      const { data } = await axios.get(`${server}/task/updateTask/${id}`, {
        withCredentials: true,
      });
      setTasks((todos) =>
        todos.map((todo) => {
          if (todo._id === data._id) {
            todo.complete = data.complete;
          }
          return todo;
        })
      );
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setRefresh(false);
    }
  };

  // Delete Task Handler
  const deleteTask = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/task/deleteTask/${id}`, {
        withCredentials: true,
      });
      setTasks((tasks) => tasks.filter((task) => task._id !== data.task._id));
      toast.success(data.message);
    } catch (error) {
      toast.success(error.response.data.message);
    }
  };

  // Add Task handler
  const addTask = async () => {
    try {
      const { data } = await axios.post(
        `${server}/task/addTask`,
        { text },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setPopupActive(false);
      setText("");
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Get All Tasks
  const getTasks = async () => {
    try {
      const { data } = await axios.get(`${server}/task/getTasks`, {
        withCredentials: true,
      });
      setTasks(data.tasks);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    getTasks();
  }, [refresh]);

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <div className="todo-wrapper">
      <h4>Your Tasks</h4>
      <div className="todos">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              className={"todo" + (task.complete ? " is-complete" : "")}
              key={task._id}
            >
              <div
                className="checkbox"
                onClick={() => updateTask(task._id)}
              ></div>
              <div className="text">{task.text}</div>
              <div className="delete-todo" onClick={() => deleteTask(task._id)}>
                <FaTrashAlt />
              </div>
            </div>
          ))
        ) : (
          <p>You currently have no tasks</p>
        )}
      </div>
      <div className="addPopup" onClick={() => setPopupActive(true)}>
        +
      </div>

      {/* Model */}
      {popupActive ? (
        <div className="popup">
          <div className="closePopup" onClick={() => setPopupActive(false)}>
            X
          </div>
          <h3>Create Task</h3>
          <input
            type="text"
            className="add-todo-input"
            placeholder="Add a task"
            onChange={(e) => setText(e.target.value)}
            required
          />
          <div className="button" onClick={addTask}>
            Add Task
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Todos;