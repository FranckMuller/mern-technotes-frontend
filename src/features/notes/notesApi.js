import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "app/api/api-slice";

const notesAdapter = createEntityAdapter({
  sortComparer: (a, b) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});

const initialState = notesAdapter.getInitialState();

export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    console.log(builder);
    return {
      getNotes: builder.query({
        query: () => "/notes",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.error;
        },
        keepUnusedDataFor: 5,
        transformResponse: (responseData) => {
          const loadedNotes = responseData.map((note) => {
            note.id = note._id;
            return note;
          });
          return notesAdapter.setAll(initialState, loadedNotes);
        },
        providedTags: (result, err, arg) => {
          if (result?.ids) {
            return [
              { type: "Note", id: "List" },
              ...result.ids.map((id) => ({ type: "Note", id })),
            ];
          } else {
            return [{ type: "Note", id: "List" }];
          }
        },
      }),
      addNewNote: builder.mutation({
        query: (data) => ({
          url: "/notes",
          method: "POST",
          body: {
            ...data,
          },
        }),
      }),
      updateNote: builder.mutation({
        query: (data) => ({
          url: "notes",
          method: "PATCH",
          body: {
            ...data,
          },
        }),
      }),
    };
  },
});

export const selectNotesResult = notesApiSlice.endpoints.getNotes.select();

const selectNotesData = createSelector(
  selectNotesResult,
  (notesResult) => notesResult.data
);

export const {
  selectAll: selectAllNotes,
  selectById: selectNoteById,
  selectIds: selectNoteIds,
} = notesAdapter.getSelectors(
  (state) => selectNotesData(state) ?? initialState
);

export const { useGetNotesQuery, useAddNewNoteMutation, useUpdateNoteMutation } = notesApiSlice;
