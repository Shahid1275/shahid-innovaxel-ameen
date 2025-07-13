import { configureStore } from "@reduxjs/toolkit";
import urlReducer from "../redux/urlSlice";

export const store = configureStore({
  reducer: {
    url: urlReducer,
  },
});
