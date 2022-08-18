import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import sidebarReducer from "./sidebar";
import jobReducer from "./job";

const store = configureStore({
  reducer: {
    auth: authReducer,
    sidebar: sidebarReducer,
    job: jobReducer,
  },
});

export default store;
