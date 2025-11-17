import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import postUtilReducer from "./postUtil";
import postReducer from "./post";
import scheduleReducer from "./schedule";
import themeReducer from "./theme";
import expenseReducer from "./expense";
import currencyRateReducer from "./currenyRate";
import api from "./middleware/api";

const store = configureStore({
  reducer: {
    user: userReducer,
    postUtil: postUtilReducer,
    post: postReducer,
    schedule: scheduleReducer,
    theme: themeReducer,
    expense: expenseReducer,
    currencyRate: currencyRateReducer,
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
