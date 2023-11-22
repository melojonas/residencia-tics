import { apiSlice } from '../../api/apiSlice';

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: 'auth/logout',
                method: 'POST',
            }),
        }),
        register: builder.mutation({
            query: (credentials) => ({
                url: 'auth/register',
                method: 'POST',
                body: credentials,
            }),
        }),
        refreshToken: builder.mutation({
            query: () => ({
                url: 'auth/refreshToken',
                method: 'POST',
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useRefreshTokenMutation,
} = authApi;