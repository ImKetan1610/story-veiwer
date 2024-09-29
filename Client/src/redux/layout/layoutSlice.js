import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMobileScreen: false,
  isTabScreen: false,
  isDesktopScreen: false,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setScreenSize(state, action) {
      const { isMobileScreen, isTabScreen, isDesktopScreen } = action.payload;
      state.isMobileScreen = isMobileScreen;
      state.isDesktopScreen = isDesktopScreen;
    },
  },
});

export const { setScreenSize } = layoutSlice.actions;
export default layoutSlice.reducer;
