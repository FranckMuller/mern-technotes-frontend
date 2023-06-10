import { useSelector } from "react-redux";
import { selectNoteById } from "./notesApi";
import { Link } from "react-router-dom";

const Note = ({ noteId }) => {
  const note = useSelector((state) => selectNoteById(state, noteId));
  console.log(note);

  if (!note) return null;

  const created = new Date(note.createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
  });
  const updated = new Date(note.updatedAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
  });

  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.username}</p>
      <p>created: {created}</p>
      <p>updated: {updated}</p>
      <Link to={`/note/${noteId}`}>edit</Link>
    </div>
  );
};

export default Note;
