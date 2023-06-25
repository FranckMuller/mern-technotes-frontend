import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "hooks/use-auth";

const DashFooter = () => {
  const { username, status } = useAuth();
  return (
    <footer className="dash-footer">
      <p>Current User: {username}</p>
      <p>Status: {status}</p>
    </footer>
  );
};
export default DashFooter;
