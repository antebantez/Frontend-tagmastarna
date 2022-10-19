import {createSlice} from "@reduxjs/toolkit";

export const registerSlice = createSlice({
  name: "register",
  initialState: {
    user: null,
  },
  reducers: {
    register: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {register} = registerSlice.actions;

export const registerUser = (state) => state.user.user;

export default registerSlice.reducer;
