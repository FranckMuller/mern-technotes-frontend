import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAddNewNoteMutation } from "./notes-api";
import { selectAuthedUserid } from "features/auth/auth-slice";

import styles from "./styles/new-note-form.module.scss";

const NewNoteForm = () => {
  const navigate = useNavigate();
  const authedUserid = useSelector(selectAuthedUserid);
  const [addNewNote, { isLoading, isSuccess, isError, error }] =
    useAddNewNoteMutation();
  console.log(authedUserid);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const onChangeTitle = (e) => setTitle(e.target.value);
  const onChangeText = (e) => setText(e.target.value);
  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (!title || !text) return;
    await addNewNote({userid: authedUserid, title, text });
  };

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setText("");
      navigate("/dash/notes");
    }
  }, [isSuccess, navigate]);

  const canSave = title && text;

  const errClass = isError ? "errmsg" : "offscreen";
  const validTitleClass = !title ? "incomplete-input" : "";
  const validTextClass = !text ? "incomplete-input" : "";

  return (
    <div className={styles["new-note-form"]}>
      <p className={errClass}>{error?.data?.message}</p>
      <h3 className={styles["title"]}>New note</h3>
      <form onSubmit={onSubmitForm}>
        <div className={styles["form-control"]}>
          <label htmlFor="title">Title:</label>
          <input
            className={validTitleClass}
            id="title"
            name="title"
            autoComplete="off"
            value={title}
            onChange={onChangeTitle}
          />
        </div>

        <div className={styles["form-control"]}>
          <label htmlFor="text">Text:</label>
          <input
            className={validTextClass}
            id="text"
            name="text"
            autoComplete="off"
            value={text}
            onChange={onChangeText}
          />
        </div>
        <div className={styles["save-button-wrap"]}>
          <button disabled={!canSave}>save</button>
        </div>
      </form>
    </div>
  );
};

export default NewNoteForm;
