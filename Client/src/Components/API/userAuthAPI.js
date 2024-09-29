import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  registerRequest,
  registerSuccess,
  registerFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  findUserRequest,
  findUserSuccess,
  findUserFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure
} from "../../redux/userAuth/userAuthSlice.js";
import { getBookmarks } from "./storyAPI.js";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

// User Registration
export const register = (values) => async (dispatch) => {
  try {
    dispatch(registerRequest());
    const { data } = await axios.post("/api/user/register", values, {
      withCredentials: true,
    });
    dispatch(registerSuccess(data));
    localStorage.setItem("username", JSON.stringify(data.username));
    toast.success("User registered successfully", {
      position: "top-right",
      autoClose: 2000,
    });
  } catch (error) {
    dispatch(registerFailure());
    toast.error(error.response?.data || "Registration failed");
  }
};

// User Login
export const login = (values) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const { data } = await axios.post("/api/user/login", values, {
      withCredentials: true,
    });
    dispatch(loginSuccess(data));
    dispatch(getBookmarks(data.userId)); // Fetch bookmarks after login
    localStorage.setItem("username", JSON.stringify(data.username));
    toast.success("User logged in successfully", {
      position: "top-right",
      autoClose: 2000,
    });
  } catch (error) {
    dispatch(loginFailure());
    toast.error(error.response?.data || "Login failed");
  }
};

// Find Logged-in User
export const findUser = () => async (dispatch) => {
  const username = JSON.parse(localStorage.getItem("username"));
  if (!username) {
    toast.error("No user found in local storage");
    return;
  }
  try {
    dispatch(findUserRequest());
    const { data } = await axios.get(`/api/user/find/${username}`);
    dispatch(findUserSuccess(data));
  } catch (error) {
    dispatch(findUserFailure());
    toast.error("Failed to find user");
  }
};

// User Logout
export const logout = () => async (dispatch) => {
  try {
    dispatch(logoutRequest());
    await axios.post("/api/user/logout", { withCredentials: true });
    dispatch(logoutSuccess());
    localStorage.removeItem("username");
    toast.success("User logged out successfully", {
      position: "top-right",
      autoClose: 1000,
    });
  } catch (error) {
    dispatch(logoutFailure());
    toast.error(error.response?.data || "Logout failed");
  }
};
