import axios from 'axios';
import store from '../app/store';

const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use((config) => {
    const state = store.getState(); // Get the current state from the Redux store
    const token = state.auth.token; // Replace 'auth' and 'token' with your actual state structure

    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Add the Authorization header
    }

    return config;
});

export default instance;
