import { useSelector } from "react-redux";
import { selectAccessToken } from "features/auth/auth-slice";
import jwtDecode from "jwt-decode";

export const useAuth = () => {
  const accessToken = useSelector(selectAccessToken);
  let isManager = false;
  let isAdmin = false;
  let status = "Employee";
  let isLogged = false;

  if (accessToken) {
    isLogged = true;
    const decoded = jwtDecode(accessToken);
    const { username, roles, userid } = decoded.userInfo;

    isManager = roles.includes("Manager");
    isAdmin = roles.includes("Admin");
    if (isManager) status = "Manager";
    if (isAdmin) status = "Admin";

    return { username, roles, userid, isManager, isAdmin, status, isLogged };
  }

  return {
    username: "",
    roles: [],
    userid: '',
    isManager,
    isAdmin,
    status,
    isLogged,
  };
};
