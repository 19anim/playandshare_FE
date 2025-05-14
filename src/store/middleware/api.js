import axios from "axios";
import { apiCallBegan } from "../api";
import apiWithToken from "../../helper/api";

const currentMode = import.meta.env.MODE;
const apiUrl =
  currentMode === "development"
    ? "http://localhost:3000/api"
    : "https://playandshare.onrender.com/api";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== apiCallBegan.type) return next(action);

    const {
      url,
      method,
      data,
      onStart,
      onSuccess,
      onError,
      withCredentials,
      accessTokenNeeded,
      isMultipartData,
    } = action.payload;

    if (onStart) dispatch({ type: onStart });

    try {
      let response = null;

      const config = {
        baseURL: apiUrl,
        url,
        method,
        data,
        withCredentials,
      };

      // Set multipart headers if needed
      if (isMultipartData) {
        config.headers = { "Content-Type": "multipart/form-data" };
      }

      if (!accessTokenNeeded) {
        response = await axios.request(config);
      } else {
        response = await apiWithToken.request(config);
      }

      dispatch({ type: onSuccess, payload: response.data });
      next(action);
    } catch (error) {
      if (onError) dispatch({ type: onError, payload: { error: error.response.data } });
      dispatch({ type: "SHOW_ERROR", payload: { error: error.response.data } });
    }
  };

export default api;
