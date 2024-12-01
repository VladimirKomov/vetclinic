import { configureStore } from "@reduxjs/toolkit";
import animalsReducer from "./animalsSlice";
import logger from "redux-logger";

const store = configureStore({
    reducer: {
        animals: animalsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(logger),
});

export default store;

