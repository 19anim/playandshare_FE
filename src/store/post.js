import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const postReducer = createSlice({
  name: "post",
  initialState: {
    posts: [],
    selfPosts: [],
    page: 1,
    hasMore: true,
    loading: false,
    error: null,
  },
  reducers: {
    getPostsStart: (state) => {
      state.loading = true;
    },
    getPostsSuccess: (state, action) => {
      const { posts, hasMore, page } = action.payload;
      state.posts = page === 1 ? posts : [...state.posts, ...posts];
      state.hasMore = hasMore;
      state.page = page;
      state.loading = false;
    },
    getSelfPostsSuccess: (state, action) => {
      const { posts } = action.payload;
      state.selfPosts = posts;
      state.loading = false;
    },
    getPostsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
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

export const {
  getPostsStart,
  getPostsSuccess,
  getSelfPostsSuccess,
  getPostsFailure,
  storeComments,
  storeLike,
} = postReducer.actions;
export default postReducer.reducer;

export const getPosts = (page = 1, limit = 5) => {
  return apiCallBegan({
    url: `/post?page=${page}&limit=${limit}`,
    onStart: getPostsStart.type,
    onSuccess: getPostsSuccess.type,
    onError: getPostsFailure.type,
    withCredentials: true,
    accessTokenNeeded: true,
  });
};

export const getSelfPosts = () => {
  return apiCallBegan({
    url: `/post/self-posts`,
    onStart: getPostsStart.type,
    onSuccess: getSelfPostsSuccess.type,
    onError: getPostsFailure.type,
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
