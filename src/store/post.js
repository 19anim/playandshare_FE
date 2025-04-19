import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const postReducer = createSlice({
  name: "post",
  initialState: { posts: [] },
  reducers: {
    storePosts: (state, action) => {
      state.posts = action.payload.posts.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
    },
    storeComments: (state, action) => {
      const updatedPost = action.payload.post;
      const index = state.posts.findIndex((p) => p._id === updatedPost._id);
      if (index !== -1) {
        state.posts[index].comments = updatedPost.comments;
      }
    },
    storeLike: (state, action) => {
      const updatedPost = action.payload.post;
      const index = state.posts.findIndex((p) => p._id === updatedPost._id);
      if (index !== -1) {
        state.posts[index].likes = updatedPost.likes;
      }
    },
  },
});

export const { storePosts, storeComments, storeLike } = postReducer.actions;
export default postReducer.reducer;

export const getPosts = () => {
  return apiCallBegan({
    url: "/post/",
    onSuccess: storePosts.type,
    withCredentials: true,
    accessTokenNeeded: true,
  });
};

export const getComments = (commentData) => {
  return apiCallBegan({
    url: "/post/comment",
    method: "POST",
    data: commentData,
    onSuccess: storeComments.type,
    withCredentials: true,
    accessTokenNeeded: true,
  });
};

export const getLikes = (postId) => {
  return apiCallBegan({
    url: "/post/like",
    method: "POST",
    data: postId,
    onSuccess: storeLike.type,
    withCredentials: true,
    accessTokenNeeded: true,
  });
};
