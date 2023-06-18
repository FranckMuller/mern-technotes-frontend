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

      onQueryStarted: async (
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      ) => {
        console.log("METHOD: [onQueryStarted]");
      },

      async onCacheEntryAdded(
        arg,
        {
          dispatch,
          getState,
          extra,
          requestId,
          cacheEntryRemoved,
          cacheDataLoaded,
          getCacheEntry,
        }
      ) {
        console.log("METHOD: [onCacheEntryAdded]");
      },
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
      }
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
        url: "/auth/refresh",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogOutMutation,
  useRefreshMutation,
  useRegistrationMutation,
} = authApi;
