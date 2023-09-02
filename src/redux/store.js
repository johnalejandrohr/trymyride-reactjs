import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import placesReducer from "./placesSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        places: placesReducer,
    }
})
