import { useSelector } from "react-redux";
import { selectUserById } from "./usersApi";
import { Link } from "react-router-dom";

const User = ({ userId }) => {
  const user = useSelector((state) => selectUserById(state, userId));

  if (!user) return null;

  const userRolesString = user.roles?.toString().replaceAll(",", ", ");
  // TO DO show status of user
  const isActive = user.active;

  return (
    <div>
      <h3>{user.username}</h3>
      <p>{userRolesString}</p>
      <Link to={`/dash/user/${userId}`}>edit</Link>
    </div>
  );
};

export default User;
