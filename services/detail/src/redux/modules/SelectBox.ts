import { createSlice } from "@reduxjs/toolkit";

interface UserInfoState {
    index:number;
    value:boolean;
}

const initialState:UserInfoState[] = [];

const Setcard = createSlice({
  name: "setUserInfo",
  initialState,
  reducers: {
    _SET: (state, action) => {
      state[action.payload.index] = action.payload;
    }
  },
});

export const { _SET} = Setcard.actions;
export default Setcard.reducer;
