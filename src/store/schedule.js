import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const scheduleReducer = createSlice({
  name: "schedule",
  initialState: {
    schedule: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchScheduleStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchScheduleSuccess: (state, action) => {
      state.schedule = action.payload.schedules;
      state.loading = false;
    },
    fetchScheduleFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    createScheduleSuccess: (state, action) => {
      state.schedule.unshift(action.payload.schedule);
      state.loading = false;
    },
  },
});

export const {
  fetchScheduleStart,
  fetchScheduleSuccess,
  fetchScheduleFailure,
  createScheduleSuccess,
} = scheduleReducer.actions;
export default scheduleReducer.reducer;

export const fetchSchedule = () => {
  return apiCallBegan({
    url: `/schedule`,
    onStart: fetchScheduleStart.type,
    onSuccess: fetchScheduleSuccess.type,
    onError: fetchScheduleFailure.type,
    withCredentials: true,
    accessTokenNeeded: true,
  });
};

export const createSchedule = (data) => {
  return apiCallBegan({
    url: `/schedule`,
    method: "POST",
    data,
    onStart: fetchScheduleStart.type,
    onSuccess: createScheduleSuccess.type,
    onError: fetchScheduleFailure.type,
    withCredentials: true,
    accessTokenNeeded: true,
  });
};
