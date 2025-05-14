import axios from "axios";

const currentMode = import.meta.env.MODE;
const apiUrl =
  currentMode === "development"
    ? "http://localhost:3000/api"
    : "https://playandshare.onrender.com/api";

const api = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    //const token = store.getState("user").user.accessToken;
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.data.message === "Token is invalid or Expired" &&
      error.response.status === 403 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        console.log("TRY TO REFRESH");
        const newToken = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        console.log("ERROR");
        return Promise.reject(err);
      }
    }
  }
);

const refreshToken = async () => {
  try {
    const refreshResponse = await api.request({
      method: "POST",
      url: "/auth/refresh",
    });

    const newAccessToken = refreshResponse.data.accessToken;
    localStorage.setItem("access_token", newAccessToken); // Store new token
    return newAccessToken;
  } catch (error) {
    console.error("Failed to refresh token", error);
    localStorage.removeItem("access_token");
    throw error;
  }
};
export default api;
