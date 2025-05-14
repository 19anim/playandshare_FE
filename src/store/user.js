import { createSlice } from "@reduxjs/toolkit";
import token from "../helper/token";
import { apiCallBegan } from "./api";

const userReducer = createSlice({
  name: "user",
  initialState: {
    userId: "",
    username: "",
    email: "",
    avatar: "",
    residence: "",
    phone: "",
    socialMedia: [
      { platform: "Facebook", link: "" },
      { platform: "Instagram", link: "" },
      { platform: "Thread", link: "" },
      { platform: "Tiktok", link: "" },
    ],
    posts: [],
    comments: [],
    roles: [],
    accessToken: token.getAccessToken(),
    loading: false,
    error: null,
  },
  reducers: {
    apiRequested: (state, action) => {
      state.loading = true;
    },
    apiRequestFailed: (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    },
    apiRequestedDone: (state, action) => {
      state.error = null;
      state.loading = false;
    },
    userDataClearance: (state, action) => {
      token.deleteAccessToken();
      state.loading = false;
      state.userId = "";
      state.username = "";
      state.email = "";
      state.accessToken = "";
      state.avatar = "";
      state.residence = "";
      state.phone = "";
      state.socialMedia = [
        { platform: "Facebook", link: "" },
        { platform: "Instagram", link: "" },
        { platform: "Thread", link: "" },
        { platform: "Tiktok", link: "" },
      ];
      state.posts = [];
      state.comments = [];
      state.roles = [];
      state.error = null;
    },
    storeLoginData: (state, action) => {
      const { accessToken, user } = action.payload;
      token.setAccessToken(accessToken);
      state.accessToken = accessToken;
      state.userId = user._id;
      state.username = user.username;
      state.email = user.email;
      state.avatar = user.avatar;
      state.residence = user.residence;
      state.phone = user.phone;
      state.socialMedia = user.socialMedia;
      state.posts = user.posts;
      state.comments = user.comments;
      state.loading = false;
      state.roles = user.roles;
      state.error = null;
      state.loading = false;
    },
    inititate: (state, action) => {
      const {
        _id,
        username,
        email,
        avatar,
        residence,
        phone,
        socialMedia,
        posts,
        comments,
        roles,
      } = action.payload;
      state.userId = _id;
      state.username = username;
      state.email = email;
      state.avatar = avatar;
      state.residence = residence;
      state.phone = phone;
      state.socialMedia = socialMedia;
      state.posts = posts;
      state.comments = comments;
      state.roles = roles;
      state.error = null;
      state.loading = false;
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

export const signup = (signupData) => {
  return apiCallBegan({
    url: "user/",
    method: "POST",
    data: signupData,
    onStart: apiRequested.type,
    onSuccess: storeLoginData.type,
    onError: apiRequestFailed.type,
    withCredentials: true,
  });
};

export const signout = () => {
  return apiCallBegan({
    url: "auth/signout",
    method: "POST",
    onStart: apiRequested.type,
    onSuccess: userDataClearance.type,
    onError: apiRequestFailed.type,
    withCredentials: true,
  });
};

export const updateUser = (userData) => {
  return apiCallBegan({
    url: "user/update",
    method: "POST",
    data: userData,
    onStart: apiRequested.type,
    onSuccess: storeLoginData.type,
    onError: apiRequestFailed.type,
    withCredentials: true,
    accessTokenNeeded: true,
  });
};

export const updateAvatar = (avatarData) => {
  return apiCallBegan({
    url: "user/avatar",
    method: "POST",
    data: avatarData,
    onStart: apiRequested.type,
    onSuccess: storeLoginData.type,
    onError: apiRequestFailed.type,
    withCredentials: true,
    accessTokenNeeded: true,
    isMultipartData: true,
  });
};
