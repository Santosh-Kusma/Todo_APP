import axios from "axios";
import { getToken, removeToken } from "../utils/auth.utils";

export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

// ---------- REQUEST INTERCEPTOR ----------
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ---------- RESPONSE INTERCEPTOR ----------
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeToken();
      setTimeout(() => {
        window.location.href = "/login";
      },1500);
    }
    return Promise.reject(error);
  }
);
