import { apiSlice } from "app/api/api-slice";
import { logout as logoutAction, setCredentials } from "./auth-slice.js";

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

      // onQueryStarted: async (
      //   arg,
      //   { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      // ) => {
      //   const data = await queryFulfilled;
      //   console.log("METHOD: [onQueryStarted]");
      // },

      // async onCacheEntryAdded(
      //   arg,
      //   {
      //     dispatch,
      //     getState,
      //     extra,
      //     requestId,
      //     cacheEntryRemoved,
      //     cacheDataLoaded,
      //     getCacheEntry,
      //   }
      // ) {
      //   console.log("METHOD: [onCacheEntryAdded]");
      // },
    }),

    registration: builder.mutation({
      query: (userData) => {
        return {
          url: "/auth/registration",
          method: "POST",
          body: {
            ...userData,
          },
        };
      },
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const data = await queryFulfilled;
          dispatch(logoutAction());
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
        } catch (err) {
          console.log(err);
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),

      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          console.log(response);
          dispatch(setCredentials(response.data));
        } catch (err) {
          return new Error(err);
        }
      },
    }),
  }),
});

export const {
  useRegistrationMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefreshMutation,
} = authApi;
