import { useGetUsersQuery } from "./users-api";
import User from "./User";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  return (
    <>
      {isLoading ? (
        <p>loading</p>
      ) : isError ? (
        <p>{error?.data?.message}</p>
      ) : isSuccess && users?.ids?.length ? (
        <div>{users.ids.map((userId) => <User key={userId} userId={userId} />)}</div>
      ) : (
        <p>users not found</p>
      )}
    </>
  );
};

export default UsersList;
