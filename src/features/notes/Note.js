import { useSelector } from "react-redux";
import { selectNoteById } from "./notes-api";
import { useNavigate } from "react-router-dom";

import styles from "./styles/note.module.scss";

const Note = ({ noteId }) => {
  const navigate = useNavigate();
  const note = useSelector((state) => selectNoteById(state, noteId));

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

  return (
    <div className={styles["note"]}>
      <h3 className={styles["title"]}>{note.title}</h3>
      <p className={styles["text"]}>{note.text}</p>
      <div className={styles['date']}>
        <p>
          created by {note.username}: <i>{created}</i>
        </p>
        <p>updated: <i>{updated}</i></p>
      </div>
      <div className={styles["buttons-group"]}>
        <button className={styles["edit-button"]} onClick={onEditButtonClick}>
          edit
        </button>
        <button className={styles["delete-button"]}>delete</button>
      </div>
    </div>
  );
};

export default Note;
