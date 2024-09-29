import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modal: false,
  modalContent: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.modal = true;
      state.modalContent = action.payload;
    },
    closeModal: (state) => {
      state.modal = false;
      state.modalContent = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
