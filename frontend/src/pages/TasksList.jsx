import { useDispatch, useSelector } from "react-redux";
import { addTask, fetchTasks } from "../store/tasks/tasks.thunk";
import { clearTaskError } from "../store/tasks/tasks.slice";
import { useState, useEffect } from "react";
import { TaskItem } from "../components/TaskItem";
import styles from "./TasksList.module.css";

export function TasksList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const { list: tasks, loading, error } = useSelector((state) => state.tasks);

  const [validation, setValidation] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearTaskError());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  function handleAdd(e) {
    e.preventDefault();

    // local validation
    if (!title.trim()) {
      setValidation("Title is required");
      return;
    }

    if (!description.trim()) {
      setValidation("Description is required");
      return;
    }

    setValidation(""); // clear local validation

    dispatch(
      addTask({
        title: title.trim(),
        description: description.trim(),
        status: "pending",
      })
    )
      .unwrap()
      .then(() => {
        // reset form on success
        setTitle("");
        setDescription("");
      });
  }

  return (
    <>
      <h1 className={styles.h1}>Welcome</h1>
      {/* Global API error */}
      {error && <p className={styles.errorText}>{error}</p>}
      <div className={styles.taskGrid}>
        <div className={styles.addTask}>
          <form onSubmit={handleAdd}>
            <h3>Add task</h3>

            {/* Local validation error */}
            {validation && <p className={styles.errorText}>{validation}</p>}

            <div>
              <label htmlFor="title">Title</label>
            </div>
            <div>
              <input
                id="title"
                placeholder="add title..."
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setValidation("");
                }}
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
            </div>
            <div>
              <textarea
                id="description"
                placeholder="write description..."
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setValidation("");
                }}
              />
            </div>
            <div>
              <button disabled={loading.add}>
                {loading.add ? "Adding..." : "Add"}
              </button>
            </div>
          </form>
        </div>

        <div className={styles.tasksList}>
          <h2>Todo List</h2>
          <hr />
          <div className={styles.taskCards}>
            {tasks?.map((task) => (
              <div key={task._id} className={styles.taskCard}>
                <TaskItem task={task} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
