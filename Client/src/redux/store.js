import { configureStore } from "@reduxjs/toolkit";
import layoutSlice from "./layout/layoutSlice";
import modalSlice from "./modal/modalSlice";
import userAuthSlice from "./userAuth/userAuthSlice";
import storySlice from "./story/storySlice";

const store = configureStore({
  reducer: {
    layout: layoutSlice,
    modal: modalSlice,
    userAuth: userAuthSlice,
    story: storySlice
  },
});

export default store;
