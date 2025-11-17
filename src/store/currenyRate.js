import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const currencyRateReducer = createSlice({
  name: "currencyRate",
  initialState: {
    rates: [],
    loading: false,
    error: null,
  },
  reducers: {
    getCurrencyRateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCurrencyRateSuccess: (state, action) => {
      const { rates } = action.payload;
      state.rates = rates;
      state.error = null;
      state.loading = false;
    },
    getCurrencyRateFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { getCurrencyRateStart, getCurrencyRateSuccess, getCurrencyRateFailure } =
  currencyRateReducer.actions;
export default currencyRateReducer.reducer;

export const getCurrencyRates = () => {
  return apiCallBegan({
    url: `/admin/currencyRate`,
    onStart: getCurrencyRateStart.type,
    onSuccess: getCurrencyRateSuccess.type,
    onError: getCurrencyRateFailure.type,
  });
};
