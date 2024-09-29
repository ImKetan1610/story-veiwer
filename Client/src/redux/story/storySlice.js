import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storyLoading: false,
  storiesLoading: false,
  categoryLoading: false,
  bookmarksLoading: false,
  stories: [],
  categoryStories: [],
  bookmarks: [],
  story: null,
  userStories: null,
  bookmarked: false,
  liked: false,
  newLike: false,
  totalLikes: 0,
  newStory: false,
  page: 1,
  userStoriesPage: 1,
};

const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {
    addStoryRequest: (state) => {
      state.storiesLoading = true;
      state.newStory = false;
    },
    addStorySuccess: (state, action) => {
      state.storiesLoading = false;
      state.newStory = true;
    },
    addStoryFailure: (state) => {
      state.storiesLoading = false;
      state.newStory = false;
    },
    getStoriesRequest: (state) => {
      state.storiesLoading = true;
    },
    getStoriesSuccess: (state, action) => {
      state.storiesLoading = false;
      state.stories = action.payload.stories;
      state.page = action.payload.page;
    },
    getStoriesFailure: (state) => {
      state.storiesLoading = false;
    },
    fetchStoryRequest: (state) => {
      state.storiesLoading = true;
    },
    fetchStorySuccess: (state, action) => {
      state.storyLoading = false;
      state.story = action.payload.story;
      state.liked = action.payload.liked;
      state.totalLikes = action.payload.totalLikes;
      state.bookmarked = action.payload.bookmarked;
    },
    fetchStoryFailure: (state) => {
      state.storiesLoading = false;
    },
    getStoryByUserRequest: (state) => {
      state.storiesLoading = true;
    },
    getStoryByUserSuccess: (state, action) => {
      state.storiesLoading = false;
      state.userStories = action.payload.stories;
      state.userStoriesPage = action.payload.page;
    },
    getStoryByUserFailure: (state) => {
      state.storiesLoading = false;
    },
    getCategoryStoriesRequest: (state) => {
      state.categoryLoading = true;
    },
    getCategoryStoriesSuccess: (state, action) => {
      state.categoryLoading = false;
      state.categoryStories = action.payload.stories;
      state.page = action.payload.page;
    },
    getCategoryStoriesFailure: (state) => {
      state.categoryLoading = false;
    },
    likeRequest: (state) => {
      state.storyLoading = true;
      state.newLike = false;
    },
    likeSuccess: (state, action) => {
      state.storyLoading = false;
      state.liked = true;
      state.newLike = true;
    },
    likeFailure: (state) => {
      state.storyLoading = false;
      state.newLike = false;
    },
    bookmarkRequest: (state) => {
      state.storyLoading = true;
    },
    bookmarkSuccess: (state, action) => {
      state.storyLoading = false;
      state.bookmarked = true;
    },
    bookmarkFailure: (state) => {
      state.storyLoading = false;
    },
    getBookmarksRequest: (state) => {
      state.bookmarksLoading = true;
    },
    getBookmarksSuccess: (state, action) => {
      state.bookmarksLoading = false;
      state.bookmarks = action.payload;
    },
    getBookmarksFailure: (state) => {
      state.bookmarksLoading = false;
    },
    editStorySuccess: (state) => {
      state.newStory = true;
    },
    endRequest: (state) => {
      state.newStory = false;
      state.newLike = false;
    },
  },
});

export const {
  addStoryRequest,
  addStorySuccess,
  addStoryFailure,
  getStoriesRequest,
  getStoriesSuccess,
  getStoriesFailure,
  fetchStoryRequest,
  fetchStorySuccess,
  fetchStoryFailure,
  getStoryByUserRequest,
  getStoryByUserSuccess,
  getStoryByUserFailure,
  getCategoryStoriesRequest,
  getCategoryStoriesSuccess,
  getCategoryStoriesFailure,
  likeRequest,
  likeSuccess,
  likeFailure,
  bookmarkRequest,
  bookmarkSuccess,
  bookmarkFailure,
  getBookmarksRequest,
  getBookmarksSuccess,
  getBookmarksFailure,
  editStorySuccess,
  endRequest,
} = storySlice.actions;

export default storySlice.reducer;
