import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateNoteMutation } from "./notes-api";
import { useAuth } from "hooks/use-auth";

import styles from "./styles/edit-note-form.module.scss";

const EditNoteForm = ({ note }) => {
  console.log(note);
  const navigate = useNavigate();
  const { userid } = useAuth();
  const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation();

  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [complete, setComplete] = useState(note.complete);

  const onTitleChange = (e) => setTitle(e.target.value);
  const onTextChange = (e) => setText(e.target.value);
  const onCompleteChange = () => setComplete((prev) => !prev);
  const onSubmitForm = (e) => {
    e.preventDefault();
    updateNote({ id: note.id, title, text, userid, ownerid: note.user });
  };

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setText("");
      navigate("/dash/notes");
    }
  }, [isSuccess]);

  const canSave = title && text;

  const errClass = error?.data?.message ? "errmsg" : "offscreen";
  const validTitleClass = !title ? "incomplete-input" : "";
  const validTextClass = !text ? "incomplete-input" : "";

  return (
    <div className={styles["edit-note-form"]}>
      <h3 className={styles["title"]}>Edit note</h3>
      <p className={styles[errClass]}>{error?.data?.message}</p>
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
          <label htmlFor="complete">Complete</label>
          <input
            type="checkbox"
            name="complete"
            id="complete"
            checked={complete}
            onChange={onCompleteChange}
          />
        </div>

        <div className={styles["buttons-group"]}>
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
        </div>
      </form>
    </div>
  );
};

export default EditNoteForm;
