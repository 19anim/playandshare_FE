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
    updateExpenseSuccess: (state, action) => {
      const index = state.expenses.findIndex((exp) => exp._id === action.payload._id);
      if (index !== -1) {
        state.expenses[index] = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    deleteExpenseSuccess: (state, action) => {
      state.expenses = state.expenses.filter((exp) => exp._id !== action.payload.id);
      state.loading = false;
      state.error = null;
    },
    deleteMultiExpensesSuccess: (state, action) => {
      const idsToDelete = action.payload.ids;
      state.expenses = state.expenses.filter((exp) => !idsToDelete.includes(exp._id));
      state.loading = false;
      state.error = null;
    },
    addPaymentToExpenseSuccess: (state, action) => {
      const index = state.expenses.findIndex((exp) => exp._id === action.payload._id);
      if (index !== -1) {
        state.expenses[index] = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    updatePaymentInExpenseSuccess: (state, action) => {
      const { expense } = action.payload;
      const index = state.expenses.findIndex((exp) => exp._id === expense._id);
      if (index !== -1) {
        state.expenses[index] = expense;
      }
      state.loading = false;
      state.error = null;
    },
  },
});
export const {
  apiRequested,
  apiRequestFailed,
  apiRequestedDone,
  setExpenses,
  creatSuccess,
  updateExpenseSuccess,
  deleteExpenseSuccess,
  deleteMultiExpensesSuccess,
  addPaymentToExpenseSuccess,
  updatePaymentInExpenseSuccess,
} = expenseReducer.actions;

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

export const updatedExpense = (id, data) =>
  apiCallBegan({
    url: `/expense/${id}`,
    method: "put",
    data,
    onStart: apiRequested.type,
    onSuccess: updateExpenseSuccess.type,
    onError: apiRequestFailed.type,
    withCredentials: true,
    accessTokenNeeded: true,
  });

export const removeExpense = (id) =>
  apiCallBegan({
    url: `/expense/${id}`,
    method: "delete",
    onStart: apiRequested.type,
    onSuccess: deleteExpenseSuccess.type,
    onError: apiRequestFailed.type,
    withCredentials: true,
    accessTokenNeeded: true,
  });

export const removeMultiExpenses = (data) =>
  apiCallBegan({
    url: `/expense/bulk`,
    method: "post",
    data,
    onStart: apiRequested.type,
    onSuccess: deleteMultiExpensesSuccess.type,
    onError: apiRequestFailed.type,
    withCredentials: true,
    accessTokenNeeded: true,
  });

export const addPaymentToExpense = (id, data) =>
  apiCallBegan({
    url: `/expense/${id}/payment`,
    method: "post",
    data,
    onStart: apiRequested.type,
    onSuccess: addPaymentToExpenseSuccess.type,
    onError: apiRequestFailed.type,
    withCredentials: true,
    accessTokenNeeded: true,
  });

export const updatePaymentInExpense = (expenseId, paymentId, data) =>
  apiCallBegan({
    url: `/expense/${expenseId}/payment/${paymentId}`,
    method: "put",
    data,
    onStart: apiRequested.type,
    onSuccess: updatePaymentInExpenseSuccess.type,
    onError: apiRequestFailed.type,
    withCredentials: true,
    accessTokenNeeded: true,
  });

export default expenseReducer.reducer;
