import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";

// ---------------- FETCH TASKS ----------------
export const fetchTasks = createAsyncThunk(
  "tasks/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/tasks");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch tasks"
      );
    }
  }
);

// ---------------- ADD TASK ----------------
export const addTask = createAsyncThunk(
  "tasks/add",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/tasks", data);
      return res.data.data;
    } catch (err) {
      const response = err.response?.data;
      if (response?.errors) {
        return rejectWithValue(response?.errors.toString());
      }
      return rejectWithValue(response?.message || "Failed to add task");
    }
  }
);

// ---------------- UPDATE TASK (title / description / status) ----------------
export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/tasks/${id}`, data);
      return res.data.data;
    } catch (err) {
      const response = err.response?.data;
      if (response?.errors) {
        return rejectWithValue(response?.errors.toString());
      }
      return rejectWithValue(response?.message || "Failed to update task");
    }
  }
);

// ---------------- DELETE TASK ----------------
export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/tasks/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete task"
      );
    }
  }
);
