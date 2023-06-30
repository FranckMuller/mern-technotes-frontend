import { useSelector } from "react-redux";
import { selectAllUsers, useGetUsersQuery } from "../users/users-api";
import PulseLoader from "react-spinners/PulseLoader";
import NewNoteForm from "./NewNoteForm";

const NewNote = () => {
  // const users = useSelector(selectAllUsers);
  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => {
      return {
        users: data?.ids.map((id) => data?.entities[id]),
      };
    },
  });

  if (!users?.length) return <PulseLoader color={"#000000"} />;

  return users ? <NewNoteForm users={users} /> : <p>loading...</p>;
};

export default NewNote;
