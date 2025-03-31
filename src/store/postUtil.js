import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const postUtilReducer = createSlice({
  name: "postUtil",
  initialState: {
    cities: [],
    playTypes: [],
  },
  reducers: {
    initiateCities: (state, action) => {
      state.cities = [...action.payload.cities];
    },
    initiatePlayTypes: (state, action) => {
      state.playTypes = [...action.payload.playTypes];
    },
  },
});

export const { initiateCities, initiatePlayTypes } = postUtilReducer.actions;
export default postUtilReducer.reducer;

export const fetchCities = () => {
  return apiCallBegan({
    url: "/admin/city",
    onSuccess: initiateCities.type,
    withCredentials: true,
  });
};

export const fetchPlayTypes = () => {
  return apiCallBegan({
    url: "/admin/play-type",
    onSuccess: initiatePlayTypes.type,
    withCredentials: true,
  });
};
