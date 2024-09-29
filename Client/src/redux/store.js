import { configureStore } from "@reduxjs/toolkit";
import layoutSlice from "./layout/layoutSlice";

const store = configureStore({
  reducer: {
    layout: layoutSlice
  },
});

export default store;
