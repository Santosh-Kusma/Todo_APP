import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasks/tasks.slice";
import authReducer from "./auth/auth.slice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    auth: authReducer,
  },
});
