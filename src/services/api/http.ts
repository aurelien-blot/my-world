// services/http.ts
import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL + "/my-world",
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


// --- Réponse: branchement configurable sur logout ---
let responseInterceptorId: number | null = null;

export const setupAxiosInterceptors = (onLogout: () => void) => {
    if (responseInterceptorId !== null) {
        api.interceptors.response.eject(responseInterceptorId);
    }

    responseInterceptorId = api.interceptors.response.use(
        (response) => response,
        (error) => {
            const status = error?.response?.status;

            if (status === 401 || status === 403) {
                onLogout(); // déclenche le vrai logout du contexte
                if (window.location.pathname !== "/login") {
                    window.location.assign("/login");
                }
            }
            return Promise.reject(error);
        }
    );
};
