import axios from "axios";
import { apiCallBegan } from "../api";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== apiCallBegan.type) return next(action);

    const { url, method, data, onStart, onSuccess, onError, withCredentials } = action.payload;

    if (onStart) dispatch({ type: onStart });

    try {
      const response = await axios.request({
        baseURL: "http://localhost:3000/api",
        url,
        method,
        data,
        withCredentials,
      });

      dispatch({ type: onSuccess, payload: response.data });
      next(action);
    } catch (error) {
      if (onError) dispatch({ type: onError, payload: { error: error.message } });
      dispatch({ type: "SHOW_ERROR", payload: { error: error.message } });
    }
  };

export default api;
