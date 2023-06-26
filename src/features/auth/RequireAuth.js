import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "hooks/use-auth";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const { roles } = useAuth();
  return (
    <>
      {roles.some((role) => allowedRoles.includes(role)) ? (
        <Outlet />
      ) : (
        <Navigate to="/signin" state={{from: location}}/>
      )}
    </>
  );
};

export default RequireAuth;
