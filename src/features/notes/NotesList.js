import { useNavigate } from "react-router-dom";
import { useGetNotesQuery } from "./notes-api";
import Note from "./Note";

import styles from "./styles/notes-list.module.scss";

const NotesList = () => {
  const navigate = useNavigate();
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery('NotesList',{
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const onNewButtonClick = () => {
    navigate("/dash/notes/new");
  };

  return (
    <>
      {isLoading ? (
        <p>loading...</p>
      ) : isError ? (
        <p>{error?.data?.message}</p>
      ) : isSuccess && notes?.ids.length ? (
        <div>
          {notes.ids.map((noteId) => (
            <Note key={noteId} noteId={noteId} />
          ))}
        </div>
      ) : (
        <p>not found</p>
      )}
      <div className={styles["new-button-wrap"]}>
        <button onClick={onNewButtonClick}>new</button>
      </div>
    </>
  );
};
export default NotesList;
