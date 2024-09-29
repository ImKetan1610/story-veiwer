import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
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
  likeSuccess,
  likeFailure,
  bookmarkRequest,
  bookmarkSuccess,
  bookmarkFailure,
  getBookmarksRequest,
  getBookmarksSuccess,
  getBookmarksFailure,
} from "../../redux/story/storySlice.js";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

// Create a New Story (Protected Route)
export const addStory = (values) => async (dispatch) => {
  try {
    dispatch(addStoryRequest());
    const { data } = await axios.post("/api/story/create", values);
    dispatch(addStorySuccess(data));
    toast.success("Story added successfully", {
      position: "top-center",
    });
  } catch (error) {
    dispatch(addStoryFailure());
    toast.error(error.response?.data || "Failed to add story", {
      position: "top-center",
    });
  }
};

// Fetch All Stories
export const getStories = (page = 1, catLimit = 4, cat = "All") => async (dispatch) => {
  try {
    dispatch(getStoriesRequest());
    const { data } = await axios.get(`/api/story?page=${page}&catLimit=${catLimit}&cat=${cat}`);
    dispatch(getStoriesSuccess(data));
  } catch (error) {
    dispatch(getStoriesFailure());
    toast.error(error.response?.data || "Failed to fetch stories");
  }
};

// Fetch Story by ID
export const getStory = (storyId, userId = null) => async (dispatch) => {
  try {
    dispatch(fetchStoryRequest());
    const { data } = await axios.get(`/api/story/${storyId}`, { params: { userId } });
    dispatch(fetchStorySuccess(data));
  } catch (error) {
    dispatch(fetchStoryFailure());
    toast.error(error.response?.data || "Failed to fetch story");
  }
};

// Fetch Stories Created by a Specific User (Protected Route)
export const getStoriesByUser = (userId, userStoriesPage = 1) => async (dispatch) => {
  try {
    dispatch(getStoryByUserRequest());
    const { data } = await axios.get(`/api/story/user/${userId}?page=${userStoriesPage}`);
    dispatch(getStoryByUserSuccess(data));
  } catch (error) {
    dispatch(getStoryByUserFailure());
    toast.error(error.response?.data || "Failed to fetch user stories");
  }
};

// Fetch Stories by Category
export const getStoriesByCategory = (category, page = 1) => async (dispatch) => {
  try {
    dispatch(getCategoryStoriesRequest());
    const { data } = await axios.get(`/api/story/category/${category}?page=${page}`);
    dispatch(getCategoryStoriesSuccess(data));
  } catch (error) {
    dispatch(getCategoryStoriesFailure());
    toast.error(error.response?.data || "Failed to fetch stories by category");
  }
};

// Like a Story (Protected Route)
export const likeStory = (id, userId) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/story/like/${id}`, { userId });
    dispatch(likeSuccess(data.story));
    toast.success("Story liked successfully", {
      position: "top-center",
    });
  } catch (error) {
    dispatch(likeFailure());
    toast.error(error.response?.data?.message || "Failed to like the story", {
      position: "top-center",
    });
  }
};

// Bookmark a Story (Protected Route)
export const bookmarkStory = (id, userId) => async (dispatch) => {
  try {
    dispatch(bookmarkRequest());
    const { data } = await axios.put(`/api/user/bookmark/${id}`, { userId });
    dispatch(bookmarkSuccess(data.story));
    toast.success("Story bookmarked successfully", {
      position: "top-center",
    });
  } catch (error) {
    dispatch(bookmarkFailure());
    toast.error(error.response?.data?.message || "Failed to bookmark the story", {
      position: "top-center",
    });
  }
};

// Get All Bookmarked Stories for a User (Protected Route)
export const getBookmarks = (userId) => async (dispatch) => {
  try {
    dispatch(getBookmarksRequest());
    const { data } = await axios.get(`/api/user/all-bookmark`);
    dispatch(getBookmarksSuccess(data.bookmarks));
  } catch (error) {
    dispatch(getBookmarksFailure());
    toast.error(error.response?.data || "Failed to fetch bookmarks");
  }
};
