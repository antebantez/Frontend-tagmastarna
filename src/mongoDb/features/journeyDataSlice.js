import {createSlice} from "@reduxjs/toolkit";

export const journeyDataSlice = createSlice({
  name: "journeysData",
  initialState: {
    journeyData: [],
  },
  reducers: {
    journeyData: (state, action) => {
      return {...state, journeyData: action.payload};
    },
    deleteJourneyData: (state, action) => {
      const journeyData = state.journeyData.filter(
        (journeyData) => journeyData.id !== action.payload.id
      );

      return {...state, journeyData: [...journeyData]};
    },
  },
});

export const {journeyData, deleteJourneyData} = journeyDataSlice.actions;

export default journeyDataSlice.reducer;
