import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import authReducer from "../features/authSlice";
import registerReducer from "../features/registerSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    register: registerReducer,
  },
});
