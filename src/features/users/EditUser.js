import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById, useGetUsersQuery } from "./users-api";
import PulseLoader from "react-spinners/PulseLoader";
import EditUserForm from "./EditUserForm";

const EditUser = () => {
  const { id } = useParams();
  // const user = useSelector((state) => selectUserById(state, id));
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => {
      return {
        user: data?.entities[id],
      };
    },
  });

  if (!user) return <PulseLoader color={"#000000"}>loading...</PulseLoader>;

  return <EditUserForm user={user} />;
};

export default EditUser;
