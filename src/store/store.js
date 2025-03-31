import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import postUtilReducer from "./postUtil";
import postReducer from "./post";
import api from "./middleware/api";

const store = configureStore({
  reducer: {
    user: userReducer,
    postUtil: postUtilReducer,
    post: postReducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), api],
});

export default store;
