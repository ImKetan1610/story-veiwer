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

//add Story
export const addStory = (values) => async (dispatch) => {
  try {
    dispatch(addStoryRequest());
    const { data } = await axios.post("/api/story/add", values);
    dispatch(addStorySuccess(data));
    toast.success("Story added successfully", {
      position: "top-center",
    });
  } catch (error) {
    dispatch(addStoryFailure());
    toast.error(error.response.data, { position: "top-center" });
  }
};

//fetch stories
export const getStories = (page, catLimit, cat) => async (dispatch) => {
  try {
    if (page === null) {
      page = 1;
    }
    if (catLimit === null) {
      catLimit = 4;
    }
    if (cat === null) {
      cat = "All";
    }
    dispatch(getStoriesRequest());
    const { data } = await axios.get(
      `/api/story/getAll?category=All&page=${page}&catLimit=${catLimit}&cat=${cat}`
    );
    dispatch(getStoriesSuccess(data));
  } catch (error) {
    dispatch(getStoriesFailure());
    toast.error(error.response.data);
  }
};

//fetch story by id
export const getStory = (storyId, userId) => async (dispatch) => {
  try {
    dispatch(fetchStoryRequest());
    if (userId === null) {
      //fetch story for not authorized users
      const { data } = await axios.get(`/api/story/getById/${storyId}`);
      dispatch(fetchStorySuccess(data));
    } else {
      //fetch story for authorized users
      const { data } = await axios.get(
        `/api/story/getById/${storyId}?userId=${userId}`
      );
      dispatch(fetchStorySuccess(data));
    }
  } catch (error) {
    dispatch(fetchStoryFailure());
    toast.error(error);
  }
};

// fetch user created stories
export const getStoriesByUser =
  (userId, userStoriesPage) => async (dispatch) => {
    try {
      if (userStoriesPage === null) {
        userStoriesPage = 1;
      }
      dispatch(getStoryByUserRequest());
      const { data } = await axios.get(
        `/api/story/getAll?userId=${userId}&page=${userStoriesPage}`
      );
      dispatch(getStoryByUserSuccess(data));
    } catch (error) {
      dispatch(getStoryByUserFailure());
      toast.error(error.response.data);
    }
  };

//fetch story by category
export const getStoriesByCategory = (category, page) => async (dispatch) => {
  try {
    if (page === null) {
      page = 1;
    }
    dispatch(getCategoryStoriesRequest());
    const { data } = await axios.get(
      `/api/story/getAll?category=${category}&page=${page}`
    );
    dispatch(getCategoryStoriesSuccess(data));
  } catch (error) {
    dispatch(getCategoryStoriesFailure());
    toast.error(error.response.data);
  }
};

//like Story
export const likeStory = (id, userId) => async (dispatch) => {
  try {
    const data = await axios.put(`/api/story/like/${id}`, { userId: userId });
    dispatch(likeSuccess(data.story));
    toast.success("Story liked and saved successfully", {
      position: "top-center",
    });
  } catch (error) {
    dispatch(likeFailure());
    toast.error(error.response.data.message, { position: "top-center" });
  }
};

//bookmark story
export const bookmarkStory = (id, userId) => async (dispatch) => {
  try {
    dispatch(bookmarkRequest());
    const { data } = await axios.put(`/api/user/bookmark/${id}`, {
      userId: userId,
    });
    dispatch(bookmarkSuccess(data.story));
    toast.success("Story bookmarked and saved successfully", {
      position: "top-center",
    });
  } catch (error) {
    dispatch(bookmarkFailure());
    toast.error(error.response.data.message, { position: "top-center" });
  }
};

//get bookmarks
export const getBookmarks = (userId) => async (dispatch) => {
  try {
    dispatch(getBookmarksRequest());
    const { data } = await axios.get(`/api/user/bookmarks/${userId}`);
    dispatch(getBookmarksSuccess(data.bookmarks));
  } catch (error) {
    dispatch(getBookmarksFailure());
    toast.error(error.response.data);
  }
};
