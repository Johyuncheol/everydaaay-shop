// modalSlice.tsx

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  isOpen: boolean;
  value : string;
}

const initialState: ModalState = {
  isOpen: false,
  value:''
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    OPENMODAL: (state,action) => {
      state.isOpen = true;
      state.value = action.payload
    },
    CLOSEMODAL: (state) => {
      state.isOpen = false;
      state.value='';
    },
  },
});

export const { OPENMODAL, CLOSEMODAL } = modalSlice.actions;
export default modalSlice.reducer;
