import { apiSlice } from "app/api/api-slice";
import { logOut as logOutAction } from "./auth-slice.js";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: {
          ...credentials,
        },
      }),
    }),
    logOut: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logOutAction());
          dispatch(apiSlice.util.resetApiSlice());
        } catch (err) {
          console.log(err);
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: '/auth/refresh',
        method: 'GET'
      })
    })
  }),
});

export const {useLoginMutation, useLogOutMutation, useRefreshMutation } = authApi
