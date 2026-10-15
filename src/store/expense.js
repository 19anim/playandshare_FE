import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import {
  deleteMultipleSchedulesSuccess,
  deleteScheduleSuccess,
  duplicateScheduleSuccess,
} from "./schedule";

// Deleting trips either removes their calculators or leaves them without a trip
const applyReleasedExpenses = (state, { deletedExpenseIds = [], unlinkedExpenseIds = [] }) => {
  state.expenses = state.expenses.filter((exp) => !deletedExpenseIds.includes(exp._id));
  state.expenses.forEach((exp) => {
    if (unlinkedExpenseIds.includes(exp._id)) exp.schedule = null;
  });
};
import { data } from "react-router-dom";

const expenseReducer = createSlice({
  name: "expense",
  initialState: {
    expenses: [],
    fetched: false,
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
      state.fetched = true;
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
    deletePaymentInExpenseSuccess: (state, action) => {
      const expense = action.payload;
      const index = state.expenses.findIndex((exp) => exp._id === expense._id);
      if (index !== -1) {
        state.expenses[index] = expense;
      }
      state.loading = false;
      state.error = null;
    },
  },
  // Keep the calculator list right after trip actions without refetching it
  extraReducers: (builder) => {
    builder
      .addCase(duplicateScheduleSuccess, (state, action) => {
        state.expenses.push(...action.payload.expenses);
      })
      .addCase(deleteScheduleSuccess, (state, action) => applyReleasedExpenses(state, action.payload))
      .addCase(deleteMultipleSchedulesSuccess, (state, action) =>
        applyReleasedExpenses(state, action.payload)
      );
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
  deletePaymentInExpenseSuccess,
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

export const deletePaymentInExpense = (expenseId, paymentId, data) =>
  apiCallBegan({
    url: `/expense/${expenseId}/payment/${paymentId}`,
    method: "delete",
    data,
    onStart: apiRequested.type,
    onSuccess: deletePaymentInExpenseSuccess.type,
    onError: apiRequestFailed.type,
    withCredentials: true,
    accessTokenNeeded: true,
  });

export const linkExpenseToSchedule = (id, scheduleId) =>
  apiCallBegan({
    url: `/expense/${id}/schedule`,
    method: "put",
    data: { schedule: scheduleId },
    onStart: apiRequested.type,
    onSuccess: updateExpenseSuccess.type,
    onError: apiRequestFailed.type,
    withCredentials: true,
    accessTokenNeeded: true,
  });

export const duplicateExpense = (id, { withPayments = false, rates = [] } = {}) =>
  apiCallBegan({
    url: `/expense/${id}/duplicate`,
    method: "post",
    data: { withPayments, rates },
    onStart: apiRequested.type,
    onSuccess: creatSuccess.type,
    onError: apiRequestFailed.type,
    withCredentials: true,
    accessTokenNeeded: true,
  });

export default expenseReducer.reducer;
