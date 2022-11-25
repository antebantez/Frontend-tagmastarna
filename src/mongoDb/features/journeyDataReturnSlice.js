import {createSlice} from "@reduxjs/toolkit";

export const journeyDataReturnSlice = createSlice({
  name: "journeysDataReturn",
  initialState: {
    journeyDataReturn: [],
  },
  reducers: {
    journeyDataReturn: (state, action) => {
      return {...state, journeyDataReturn: action.payload};
    },

    deleteJourneyDataReturn: (state, action) => {
      const journeyDataReturn = state.journeyDataReturn.filter(
        (journeyDataReturn) => journeyDataReturn.id !== action.payload.id
      );

      return {...state, journeyDataReturn: [...journeyDataReturn]};
    },
  },
});

export const {journeyDataReturn, deleteJourneyDataReturn} =
  journeyDataReturnSlice.actions;

export default journeyDataReturnSlice.reducer;
