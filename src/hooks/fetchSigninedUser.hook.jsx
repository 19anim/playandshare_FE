import { useEffect, useState } from "react";
import axios from "axios";
import token from "../helper/token";
import store from "../store/store";
import { inititate } from "../store/user";

const fetchSigninedUser = () => {
  const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
  });

  api.interceptors.request.use(
    (config) => {
      const accessToken = token.getAccessToken();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
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
        originalRequest._retry = true; // Prevent infinite loops

        try {
          const res = await axios.request({
            method: "POST",
            url: "http://localhost:3000/api/auth/refresh",
            withCredentials: true,
          });
          const newAccessToken = res.data.accessToken;

          localStorage.setItem("access_token", newAccessToken);
          token.setAccessToken(newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return axios(originalRequest); // Retry the failed request
        } catch (refreshError) {
          console.log("Session expired. Please log in again.");
          localStorage.removeItem("access_token");
        }
      }

      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.request({
          method: "POST",
          url: "http://localhost:3000/api/auth/verify",
        });

        if (response) {
          store.dispatch(inititate({ ...response.data.user }));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  return null;
};

export default fetchSigninedUser;
