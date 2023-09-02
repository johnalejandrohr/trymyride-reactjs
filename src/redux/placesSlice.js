import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
   places: [],
}

const placesSlice = createSlice({
    name: 'places',
    initialState,
    reducers: {
        addPlace: (state, action) => {
            const places = action.payload;
            state.places = places
        }
    }
})

export const { addPlace } = placesSlice.actions;
export default placesSlice.reducer;

export const selectPlaces = state => state.places.places;
export const selectPlaceById = createSelector(
    [selectPlaces, (_, id) => id], 
    (places, id) => places.find(place => place.id === id)
  );
