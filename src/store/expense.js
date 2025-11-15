import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const expenseReducer = createSlice({
  name: "expense",
  initialState: {
    expenses: [],
    loading: false,
    error: null,
  },
  reducers: {
    apiRequested: (state, action) => {
      state.loading = true;
    },
    apiRequestFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    apiRequestedDone: (state, action) => {
      state.error = null;
      state.loading = false;
    },
    setExpenses: (state, action) => {
      state.expenses = action.payload;
      state.loading = false;
      state.error = null;
    },
    creatSuccess: (state, action) => {
      state.expenses.push(action.payload);
      state.loading = false;
      state.error = null;
    },
  },
});
export const { apiRequested, apiRequestFailed, apiRequestedDone, setExpenses, creatSuccess } =
  expenseReducer.actions;

export const fetchExpenses = () =>
  apiCallBegan({
    url: "/expense",
    method: "get",
    onStart: apiRequested.type,
    onSuccess: setExpenses.type,
    onError: apiRequestFailed.type,
    withCredentials: true,
    accessTokenNeeded: true,
  });

export const createExpense = (data) =>
  apiCallBegan({
    url: "/expense",
    method: "post",
    data,
    onStart: apiRequested.type,
    onSuccess: creatSuccess.type,
    onError: apiRequestFailed.type,
    withCredentials: true,
    accessTokenNeeded: true,
  });

export default expenseReducer.reducer;
