import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: 'John Alejadro',
    username: 'johnssther',
    email: 'johnssther.alejandro@gmail.com'
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            const {name, username, email} = action.payload;
            state.name = name;
            state.username = username;
            state.email = email;

        }
    }
})

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
