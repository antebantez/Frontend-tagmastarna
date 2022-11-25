import {createSlice} from "@reduxjs/toolkit";

export const roundsSlice = createSlice({
  name: "rounds",
  initialState: {
    rounds: 0,
  },
  reducers: {
    incrementByOne: (state, action) => {
      state.rounds += 1;
    },
    setRoundZero: (state, action) => {
      state.rounds = 0;
    },
  },
});

export const {incrementByOne, setRoundZero} = roundsSlice.actions;

export default roundsSlice.reducer;
