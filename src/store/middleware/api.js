import axios from "axios";
import { apiCallBegan } from "../api";
import apiWithToken from "../../helper/api";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== apiCallBegan.type) return next(action);

    const { url, method, data, onStart, onSuccess, onError, withCredentials, accessTokenNeeded } =
      action.payload;

    if (onStart) dispatch({ type: onStart });

    try {
      let response = null;
      if (!accessTokenNeeded) {
        response = await axios.request({
          baseURL: "http://localhost:3000/api",
          url,
          method,
          data,
          withCredentials,
        });
      } else {
        response = await apiWithToken.request({
          baseURL: "http://localhost:3000/api",
          url,
          method,
          data,
          withCredentials,
        });
      }

      dispatch({ type: onSuccess, payload: response.data });
      next(action);
    } catch (error) {
      if (onError) dispatch({ type: onError, payload: { error: error.response.data } });
      dispatch({ type: "SHOW_ERROR", payload: { error: error.response.data } });
    }
  };

export default api;
