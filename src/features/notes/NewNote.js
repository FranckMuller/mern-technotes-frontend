import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersApi";
import NewNoteForm from "./NewNoteForm";

const NewNote = () => {
  const users = useSelector(selectAllUsers);
  return users ? <NewNoteForm users={users} /> : <p>loading...</p>;
};

export default NewNote;
