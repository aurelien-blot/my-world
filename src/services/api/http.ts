// services/http.ts
import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL + "/api/my-world",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
