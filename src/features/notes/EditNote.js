import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectNoteById, useGetNotesQuery } from "./notes-api";
import { selectAllUsers, useGetUsersQuery } from "../users/users-api";
import { useAuth } from "hooks/use-auth";
import PulseLoader from "react-spinners/PulseLoader";
import EditNoteForm from "./EditNoteForm";

const EditNote = () => {
  const { id } = useParams();
  // const note = useSelector((state) => selectNoteById(state, id));
  // const users = useSelector(selectAllUsers);
  const { username, isAdmin, isManager } = useAuth();
  const note = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[id],
    }),
  });

  const users = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!isManager && !isAdmin) {
    if (username !== note.username) {
      return <p>No access...</p>;
    }
  }

  return users && note ? (
    <EditNoteForm users={users} note={note} />
  ) : (
    <PulseLoader color={"#000000"} />
  );
};

export default EditNote;
