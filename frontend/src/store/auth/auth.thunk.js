import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import { saveToken, removeToken } from "../../utils/auth.utils";

// -------- LOGIN --------
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", credentials);
      const { token, data: user } = res.data;
      saveToken(token);
      return user;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Invalid email or password"
      );
    }
  }
);

// -------- REGISTER --------
export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      await api.post("/auth/register", data);
      return true;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);

// -------- LOGOUT --------
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  removeToken();
});
