import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const postReducer = createSlice({
  name: "post",
  initialState: [],
  reducers: {
    storePosts: (state, action) => {
      return action.payload.posts;
    },
  },
});

export const { storePosts } = postReducer.actions;
export default postReducer.reducer;

export const getPosts = () => {
  return apiCallBegan({
    url: "/post/",
    onSuccess: storePosts.type,
    withCredentials: true,
    accessTokenNeeded: true,
  });
};
