import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import postUtilReducer from "./postUtil";
import postReducer from "./post";
import themeReducer from "./theme";
import api from "./middleware/api";

const store = configureStore({
  reducer: {
    user: userReducer,
    postUtil: postUtilReducer,
    post: postReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["api/callBegan"],
        ignoredActionPaths: ["payload.data"],
      },
    }).concat(api),
});

export default store;
