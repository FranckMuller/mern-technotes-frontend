import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateNoteMutation } from "./notes-api";

import styles from "./styles/edit-note-form.module.scss";

const EditNoteForm = ({ note }) => {
  const navigate = useNavigate();
  const [updateNote, { isSuccess, error }] = useUpdateNoteMutation();

  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [completed, setCompleted] = useState(note.completed);

  const onTitleChange = (e) => setTitle(e.target.value);
  const onTextChange = (e) => setText(e.target.value);
  const onCompletedChange = () => setCompleted((prev) => !prev);
  const onSubmitForm = (e) => {
    e.preventDefault();
    updateNote({
      id: note.id,
      title,
      text,
      ownerid: note.user,
      completed,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setText("");
      navigate("/dash/notes");
    }
  }, [isSuccess, navigate]);

  const canSave = title && text;

  const errClass = error?.data?.message ? "error" : "offscreen";
  const validTitleClass = !title ? "incomplete-input" : "";
  const validTextClass = !text ? "incomplete-input" : "";

  return (
    <div className={styles["edit-note-form"]}>
      <h3 className={styles["title"]}>Edit note</h3>
      <form onSubmit={onSubmitForm}>
        <div className={styles["form-control"]}>
          <label htmlFor="title">Title</label>
          <input
            className={styles[validTitleClass]}
            name="title"
            id="title"
            autoComplete="off"
            value={title}
            onChange={onTitleChange}
          />
        </div>

        <div className={styles["form-control"]}>
          <label htmlFor="text">Text</label>
          <input
            className={styles[validTextClass]}
            name="text"
            id="text"
            autoComplete="off"
            value={text}
            onChange={onTextChange}
          />
        </div>

        <div className={styles["form-control-select"]}>
          <label htmlFor="completed">Completed</label>
          <input
            type="checkbox"
            name="completed"
            id="completed"
            checked={completed}
            onChange={onCompletedChange}
          />
        </div>

        <div className={styles["button-wrapper"]}>
          <button
            className={styles["save-button"]}
            title="Save"
            disabled={!canSave}
          >
            Save
          </button>
          <button
            className={styles["delete-button"]}
            title="delete"
            type="button"
          >
            delete
          </button>

          <p className={styles[errClass]}>{error?.data?.message}</p>
        </div>
      </form>
    </div>
  );
};

export default EditNoteForm;
