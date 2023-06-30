import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "app/api/api-slice";

const notesAdapter = createEntityAdapter({
  sortComparer: (a, b) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});

const initialState = notesAdapter.getInitialState();

export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getNotes: builder.query({
        query: () => ({
          url: "/notes",
          validateStatus: (response, result) => {
            return response.status === 200 && !result.error;
          },
        }),
        keepUnusedDataFor: 5,
        transformResponse: (responseData) => {
          const loadedNotes = responseData.map((note) => {
            note.id = note._id;
            return note;
          });
          return notesAdapter.setAll(initialState, loadedNotes);
        },
        providesTags: (result, err, arg) => {
          if (result?.ids) {
            return [
              { type: "Notes", id: "LIST" },
              ...result.ids.map((id) => ({ type: "Notes", id })),
            ];
          } else {
            return [{ type: "Notes", id: "LIST" }];
          }
        },
      }),

      addNewNote: builder.mutation({
        query: (data) => {
          return {
            url: "/notes",
            method: "POST",
            body: {
              ...data,
            },
          };
        },
        invalidatesTags: [{ type: "Notes", id: "LIST" }],
      }),

      updateNote: builder.mutation({
        query: (data) => ({
          url: "notes",
          method: "PATCH",
          body: {
            ...data,
          },
        }),
        invalidatesTags: (result, err, arg) => [{ type: "Notes", id: arg.id }],
      }),

      deleteNote: builder.mutation({
        query: (id) => ({
          url: "/notes",
          method: "DELETE",
          body: { id },
        }),
        invalidatesTags: [{ type: "Notes", id: "LIST" }],
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

export const {
  useGetNotesQuery,
  useAddNewNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApiSlice;
