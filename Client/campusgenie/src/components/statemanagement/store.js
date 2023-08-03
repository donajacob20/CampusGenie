import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootreducer.js"; // Replace with your actual root reducer

const store = configureStore({
  reducer: rootReducer, // Pass the root reducer
  // Other store configuration options if needed
});

export default store;
