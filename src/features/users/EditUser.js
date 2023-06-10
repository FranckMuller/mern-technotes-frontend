import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersApi";
import EditUserForm from './EditUserForm'

const EditUser = () => {
  const { id } = useParams();
  const user = useSelector((state) => selectUserById(state, id));

  if (!user) return <p>loading...</p>;

  return <EditUserForm user={user} />;
};

export default EditUser;
