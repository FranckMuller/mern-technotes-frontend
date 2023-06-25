import { useGetUsersQuery } from "./users-api";
import User from "./User";

import styles from "./styles/users-list.module.scss";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("UsersList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  return (
    <div className={styles['users-list']}>
      {isLoading ? (
        <p>loading</p>
      ) : isError ? (
        <p>{error?.data?.message}</p>
      ) : isSuccess && users?.ids?.length ? (
        <div>
          {users.ids.map((userId) => (
            <User key={userId} userId={userId} />
          ))}
        </div>
      ) : (
        <p>users not found</p>
      )}
    </div>
  );
};

export default UsersList;
