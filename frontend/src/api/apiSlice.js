import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { authSuccess, logout } from '../app/auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result.error && result.error.status === 401) {
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions) // try to get a new token

        // Check for 200 or 204 status codes
        if (refreshResult.status === 200) {
            api.dispatch(authSuccess(refreshResult.data)) // store the new token
            result = await baseQuery(args, api, extraOptions) // retry the initial query
        } else {
            api.dispatch(logout())
        }
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
    }),
    overrideExisting: false,
})
