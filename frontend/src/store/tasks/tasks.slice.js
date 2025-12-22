import { createSlice } from "@reduxjs/toolkit";
import { addTask, deleteTask, fetchTasks, updateTask } from "./tasks.thunk";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    list: [],
    loading: {
      fetch: false,
      add: false,
      update: false,
      delete: false,
    },
    error: null,
  },
  reducers: {
    clearTaskError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // ---------- FETCH ----------
      .addCase(fetchTasks.pending, (state) => {
        state.loading.fetch = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.list = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading.fetch = false;
        state.error = action.payload;
      })

      // ---------- ADD ----------
      .addCase(addTask.pending, (state) => {
        state.loading.add = true;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading.add = false;
        state.list.unshift(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading.add = false;
        state.error = action.payload;
      })

      // ---------- UPDATE ----------
      .addCase(updateTask.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading.update = false;
        const updatedTask = action.payload;
        const index = state.list.findIndex(
          (t) => t._id === updatedTask._id
        );
        if (index !== -1) {
          state.list[index] = updatedTask;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading.update = false;
        state.error = action.payload;
      })

      // ---------- DELETE ----------
      .addCase(deleteTask.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.list = state.list.filter(
          (t) => t._id !== action.payload
        );
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading.delete = false;
        state.error = action.payload;
      });
  },
});

export const { clearTaskError } = taskSlice.actions;
export default taskSlice.reducer;
