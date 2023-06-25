import { useSelector } from "react-redux";
import { selectUserById, useDeleteUserMutation } from "./users-api";
import { useNavigate } from "react-router-dom";
import { BsFillRecordFill } from "react-icons/bs";

import styles from "./styles/user.module.scss";

const User = ({ userId }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => selectUserById(state, userId));
  const [deleteUser] = useDeleteUserMutation();

  if (!user) return null;

  const onEditButtonClick = () => {
    navigate(`/dash/users/${userId}`);
  };

  const onDeleteButtonClick = async () => {
    await deleteUser({ id: userId });
  };

  const userRolesString = user.roles?.toString().replaceAll(",", ", ");

  return (
    <div className={styles["user"]}>
      <h4 className={styles["username"]}>
        {user.username}
        <BsFillRecordFill color={user.active ? "green" : "red"} />
      </h4>

      <h4>{user.id}</h4>

      {userRolesString && (
        <p className={styles["roles"]}>
          Roles: <i>{userRolesString}</i>
        </p>
      )}
      <div className={styles["buttons-group"]}>
        <button className={styles["edit-button"]} onClick={onEditButtonClick}>
          edit
        </button>
        <button
          className={styles["delete-button"]}
          onClick={onDeleteButtonClick}
        >
          delete
        </button>
      </div>
    </div>
  );
};

export default User;
