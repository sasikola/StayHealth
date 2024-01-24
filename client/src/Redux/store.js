import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./alertSlice";

const store = configureStore({
  reducer: {
    alerts: alertReducer,
  },
});

export default store;
