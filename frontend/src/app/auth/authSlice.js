import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accessToken: null,
    isAuthenticated: false,
    isLoading: false,
    user: null,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authLoading: (state) => {
            state.isLoading = true;
        },
        authSuccess: (state, action) => {
            const { accessToken, user } = action.payload;
            state.token = accessToken;
            state.user = user;
            state.isAuthenticated = true;
            state.isLoading = false;
            state.error = null;
        },
        authFail: (state, action) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = null;
        },
    },
});

export const { authLoading, authSuccess, authFail, logout } = authSlice.actions;

export default authSlice.reducer;

export const userSelector = (state) => state.auth.user;
export const tokenSelector = (state) => state.auth.token;
