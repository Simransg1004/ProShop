import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo : localStorage.getItem("userInfo") ? 
        JSON.parse(localStorage.getItem("userInfo")) :
        null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
        },
        logout: (state, action) => {
            state.userInfo = null;
            // Note: Here we also need to remove the cart from storage so the next
            // logged in user doesn't inherit the previous user's cart and shipping
            localStorage.clear();
        }

    }
})

export default authSlice.reducer

export const { setCredentials, logout } = authSlice.actions