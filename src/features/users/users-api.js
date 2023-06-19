import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "app/api/api-slice";

const usersAdapter = createEntityAdapter();
const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.error;
      },
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        const loadedUsers = responseData.map((user) => {
          user.id = user._id;
          return user;
        });
          console.log(1111111, loadedUsers);
        return usersAdapter.setAll(initialState, loadedUsers);
      },
      providedTags: (result, err, arg) => {
        if (result?.ids) {
          return [
            { type: "User", id: "List" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else {
          return [{ type: "User", id: "List" }];
        }
      },
    }),
    addNewUser: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: {
          ...data,
        },
      }),
      invalidatesTags: [
        {
          type: "user",
          id: "LIST",
        },
      ],
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "PATCH",
        body: {
          ...data,
        },
      }),
      invalidatesTags: (result, err, arg) => [{ type: "User", id: arg.id }],
    }),

    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: "/users",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, err, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
});

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data
);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors(
  (state) => selectUsersData(state) ?? initialState
);

export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;
