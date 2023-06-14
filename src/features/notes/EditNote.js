import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectNoteById } from "./notes-api";
import { selectAllUsers } from "../users/users-api";
import EditNoteForm from "./EditNoteForm";

const EditNote = () => {
  const { id } = useParams();
  const note = useSelector((state) => selectNoteById(state, id));
  const users = useSelector(selectAllUsers);

  return users && note ? (
    <EditNoteForm users={users} note={note} />
  ) : (
    <p>loading</p>
  );
};

export default EditNote;
