import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import authReducer from "../features/authSlice";
import registerReducer from "../features/registerSlice";
import journeyDataReducer from "../features/journeyDataSlice";
import journeyDataReturnReducer from "../features/journeyDataReturnSlice";
import roundsReducer from "../features/roundsSlice";
export default configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    register: registerReducer,
    journeyData: journeyDataReducer,
    journeyDataReturn: journeyDataReturnReducer,
    rounds: roundsReducer,
  },
});
