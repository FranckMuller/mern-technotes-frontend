import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

console.log(process.env.REACT_APP_API_URL);

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  tagTypes: ["users", "notes"],
  endpoints: (builder) => ({}),
});