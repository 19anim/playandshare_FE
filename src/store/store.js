import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import api from "./middleware/api";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), api],
});

export default store;
