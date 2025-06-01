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
        headers: isMultipartData ? { "Content-Type": "multipart/form-data" } : {},
        validateStatus: function (status) {
          return true;
        },
      };

      response = !accessTokenNeeded
        ? await axios.request(config)
        : await apiWithToken.request(config);

      if (response.status >= 400) {
        if (onError) {
          dispatch({ type: onError, payload: response.data });
        }
        return;
      }

      dispatch({ type: onSuccess, payload: response.data });
      next(action);
    } catch (error) {
      console.log("API Error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });

      const errorMessage = error.response?.data || {
        success: "false",
        message: "Có lỗi xảy ra, vui lòng thử lại.",
      };

      if (onError) {
        dispatch({ type: onError, payload: errorMessage });
      }
    }
  };

export default api;
