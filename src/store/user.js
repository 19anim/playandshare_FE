import { createSlice } from "@reduxjs/toolkit";
import token from "../helper/token";
import { apiCallBegan } from "./api";

const userReducer = createSlice({
  name: "user",
  initialState: {
    userId: "",
    username: "",
    email: "",
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
    userDataClearance: (state, action) => {
      token.deleteAccessToken();
      state.loading = false;
      state.userId = "";
      state.username = "";
      state.email = "";
      state.accessToken = "";
    },
    storeLoginData: (state, action) => {
      const { accessToken, user } = action.payload;
      token.setAccessToken(accessToken);
      state.accessToken = accessToken;
      state.userId = user._id;
      state.username = user.username;
      state.email = user.email;
      state.loading = false;
    },
    inititate: (state, action) => {
      const { id, username, email } = action.payload;
      state.userId = id;
      state.username = username;
      state.email = email;
    },
  },
});

export const { apiRequested, apiRequestFailed, storeLoginData, inititate, userDataClearance } =
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

export const signout = () => {
  return apiCallBegan({
    url: "auth/signout",
    onStart: apiRequested.type,
  });
};
