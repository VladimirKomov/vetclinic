import { configureStore } from "@reduxjs/toolkit";
import animalsReducer from "./animalsSlice";
import eventsReducer from "./eventsSlice";

const store = configureStore({
    reducer: {
        animals: animalsReducer,
        events: eventsReducer,
    },
});

export default store;

