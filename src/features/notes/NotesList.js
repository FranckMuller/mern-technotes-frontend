import { useNavigate } from "react-router-dom";
import { useGetNotesQuery } from "./notes-api";
import { useAuth } from "hooks/use-auth";
import Note from "./Note";

import styles from "./styles/notes-list.module.scss";

const NotesList = () => {
  const navigate = useNavigate();
  const { username, isAdmin, isManager } = useAuth();
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery("NotesList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const onNewButtonClick = () => {
    navigate("/dash/notes/new");
  };

  let filteredIds = null;
  if (isSuccess) {
    const { ids, entities } = notes;
    if (isManager || isAdmin) {
      filteredIds = [...ids];
    } else {
      filteredIds = ids.filter(
        (noteId) => entities[noteId].username === username
      );
    }
  }

  return (
    <div className={styles['notes-list']}>
      {isLoading ? (
        <p>loading...</p>
      ) : isError ? (
        <p>{error?.data?.message}</p>
      ) : isSuccess && filteredIds?.length ? (
        <div>
          {filteredIds.map((noteId) => (
            <Note key={noteId} noteId={noteId} />
          ))}
        </div>
      ) : (
        <p>not found</p>
      )}
    </div>
  );
};
export default NotesList;
