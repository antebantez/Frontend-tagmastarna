import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import {Provider} from "react-redux";
import store from "./mongoDb/app/store";
import {loadUser} from "./mongoDb/features/authSlice";

store.dispatch(loadUser(null));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
