import { useGetNotesQuery } from "./notesApi";
import Note from "./Note";

const NotesList = () => {
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery();

  return (
    <>
      {isLoading ? (
        <p>loading...</p>
      ) : isError ? (
        <p>{error?.data}</p>
      ) : isSuccess && notes?.ids.length ? (
        notes.ids.map((noteId) => <Note key={noteId} noteId={noteId} />)
      ) : (
        <p>not found</p>
      )}
    </>
  );
};
export default NotesList;
