import { apiSlice } from '../../api/apiSlice';

export const usersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => 'users',
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `users/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetUsersQuery, useDeleteUserMutation } = usersApi;