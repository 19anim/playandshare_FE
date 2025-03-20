import { createSlice } from "@reduxjs/toolkit";
import token from "../helper/token";
import { apiCallBegan } from "./api";

const userReducer = createSlice({
  name: "user",
  initialState: {
    userId: "",
    username: "",
    accessToken: token.getAccessToken(),
    loading: false,
    error: null,
  },
  reducers: {
    apiRequested: (state, action) => {
      state.loading = true;
    },
    apiRequestFailed: (state, action) => {
      state.loading = false;
    },
    apiRequestedDone: (state, action) => {
      state.loading = false;
    },
    storeLoginData: (state, action) => {
      const { accessToken, user } = action.payload;
      token.setAccessToken(accessToken);
      state.accessToken = accessToken;
      state.userId = user._id;
      state.username = user.username;
      state.loading = false;
    },
    initiateAccessToken: (state, action) => {
      console.log(token.getAccessToken());
      state = {
        ...state,
        accessToken: token.getAccessToken(),
      };
    },
  },
});

export const { apiRequested, apiRequestFailed, storeLoginData, initiateAccessToken } =
  userReducer.actions;
export default userReducer.reducer;

export const signin = (signinData) => {
  return apiCallBegan({
    url: "auth/signin",
    method: "POST",
    data: signinData,
    onStart: apiRequested.type,
    onSuccess: storeLoginData.type,
    onError: apiRequestFailed.type,
    withCredentials: true,
  });
};
