import { configureStore } from "@reduxjs/toolkit";
import bookItemsReducer from "./items-slice";

const store = configureStore({
    reducer: {
        bookItems: bookItemsReducer,
    }
});

export default store;