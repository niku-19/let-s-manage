import { configureStore } from "@reduxjs/toolkit";
import volunteersReducer from "./volunteersSlice"; // Existing import
import eventsReducer from "./eventSlice.js"; // New import for events

const rootReducer = {
  volunteers: volunteersReducer,
  events: eventsReducer
};

const store = configureStore({
  reducer: rootReducer
});

export default store;
