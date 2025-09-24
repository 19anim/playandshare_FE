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
    updateScheduleSuccess: (state, action) => {
      const index = state.schedule.findIndex((s) => s._id === action.payload.updatedSchedule._id);
      if (index !== -1) {
        state.schedule[index] = action.payload.updatedSchedule;
      }
      state.loading = false;
    },
    deleteScheduleSuccess: (state, action) => {
      state.schedule = state.schedule.filter((s) => s._id !== action.payload.deletedSchedule._id);
      state.loading = false;
    },
    deleteMultipleSchedulesSuccess: (state, action) => {
      state.schedule = state.schedule.filter(
        (s) => !action.payload.deletedScheduleIds.includes(s._id)
      );
      state.loading = false;
    },
  },
});

export const {
  fetchScheduleStart,
  fetchScheduleSuccess,
  fetchScheduleFailure,
  createScheduleSuccess,
  updateScheduleSuccess,
  deleteScheduleSuccess,
  deleteMultipleSchedulesSuccess,
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

export const updateSchedule = (scheduleId, newSchedule) => {
  return apiCallBegan({
    url: `schedule/${scheduleId}`,
    method: "POST",
    data: newSchedule,
    onStart: fetchScheduleStart.type,
    onSuccess: updateScheduleSuccess.type,
    onError: fetchScheduleFailure.type,
    withCredentials: true,
    accessTokenNeeded: true,
  });
};

export const deleteSchedule = (scheduleId) => {
  return apiCallBegan({
    url: `schedule/${scheduleId}`,
    method: "DELETE",
    onStart: fetchScheduleStart.type,
    onSuccess: deleteScheduleSuccess.type,
    onError: fetchScheduleFailure.type,
    withCredentials: true,
    accessTokenNeeded: true,
  });
};

export const deleteMultipleSchedules = (scheduleIds) => {
  return apiCallBegan({
    url: `schedule/`,
    method: "DELETE",
    data: { scheduleIds },
    onStart: fetchScheduleStart.type,
    onSuccess: deleteMultipleSchedulesSuccess.type,
    onError: fetchScheduleFailure.type,
    withCredentials: true,
    accessTokenNeeded: true,
  });
};
