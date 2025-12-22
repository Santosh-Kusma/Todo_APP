import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTask, deleteTask } from "../store/tasks/tasks.thunk";
import styles from "../pages/TasksList.module.css";

export function TaskItem({ task }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.tasks);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [validation, setValidation] = useState("");

  // ---------- SAVE UPDATED TITLE / DESCRIPTION ----------
  const handleSave = () => {
    if (!title.trim()) {
      setValidation("Title is required");
      return;
    }

    if (!description.trim()) {
      setValidation("Description is required");
      return;
    }

    setValidation("");

    dispatch(
      updateTask({
        id: task._id,
        data: {
          title: title.trim(),
          description: description.trim(),
        },
      })
    )
      .unwrap()
      .then(() => setIsEditing(false));
  };

  // ---------- CANCEL EDIT ----------
  const handleCancel = () => {
    setTitle(task.title);
    setDescription(task.description);
    setValidation("");
    setIsEditing(false);
  };

  // ---------- TOGGLE STATUS ----------
  const handleStatusChange = () => {
    dispatch(
      updateTask({
        id: task._id,
        data: {
          status: task.status === "completed" ? "pending" : "completed",
        },
      })
    );
  };

  return (
    <>
      {validation && <p className={styles.errorText}>{validation}</p>}

      {!isEditing ? (
        <>
          <div className={styles.titleDiv}>
            <h3>{task.title}</h3>
            <div className={styles.actions}>
              <button onClick={() => setIsEditing(true)}>Edit</button>

              <button disabled={loading.update} onClick={handleStatusChange}>
                {loading.update ? "Updating..." : task.status}
              </button>

              <button
                disabled={loading.delete}
                onClick={() => dispatch(deleteTask(task._id))}
              >
                {loading.delete ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
          <p className={styles.desc}>{task.description}</p>
        </>
      ) : (
        <div className={styles.inlineEdit}>
          <div>
            <input
              id="title"
              placeholder="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setValidation("");
              }}
            />
          </div>
          <div className={styles.textarea}>
            <textarea
              id="description"
              placeholder="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setValidation("");
              }}
            />
          </div>
          <div className={styles.editActions}>
            <button disabled={loading.update} onClick={handleSave}>
              {loading.update ? "Saving..." : "Save"}
            </button>

            <button disabled={loading.update} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
