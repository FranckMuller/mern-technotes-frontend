import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectNoteById, useDeleteNoteMutation } from "./notes-api";

import styles from "./styles/note.module.scss";

const Note = ({ noteId }) => {
  const navigate = useNavigate();
  const note = useSelector((state) => selectNoteById(state, noteId));
  const [deleteNote, { isLoading, isSuccess, isError, error }] =
    useDeleteNoteMutation();

  if (!note) return null;

  const created = new Date(note.createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
  });
  const updated = new Date(note.updatedAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
  });

  const onEditButtonClick = () => {
    navigate(`/dash/notes/${noteId}`);
  };

  const onDelete = async () => {
    await deleteNote(note.id);
  };

  return (
    <div className={styles["note"]}>
    
      {isLoading && <p>deleting is processing...</p>}
    
      <h3 className={styles["title"]}>{note.title}</h3>
      <p className={styles["text"]}>{note.text}</p>
      <div className={styles["date"]}>
        <p>
          created by <span className={styles["username"]}>{note.username}</span>
          : <i>{created}</i>
        </p>
        <p>
          updated: <i>{updated}</i>
        </p>
      </div>
      <div className={styles["buttons-group"]}>
        <button className={styles["edit-button"]} onClick={onEditButtonClick}>
          edit
        </button>
        <button className={styles["delete-button"]} onClick={onDelete}>
          delete
        </button>
      </div>
    </div>
  );
};

export default Note;
