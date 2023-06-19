import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { selectAuthedUser } from "features/auth/auth-slice";
import { useLogoutMutation } from "features/auth/auth-api";
import styles from "./styles/header.module.scss";

const Header = () => {
  const location = useLocation();
  const authedUser = useSelector(selectAuthedUser);
  console.log(location);

  const onLogout = () => {};
  return (
    <header className={styles["header"]}>
      <nav>
        <ul>
          <li>
            <Link to="/dash/users">users</Link>
          </li>
          <li>
            <Link to="/dash/notes">notes</Link>
          </li>
          <li>
            <Link to="/signin">sign in</Link>
          </li>
        </ul>
        {!authedUser ? (
          <Link to="/signup" className={styles["sign-up-link"]}>
            Sign up
          </Link>
        ) : (
          <button className={styles["signout-button"]} onClick={onLogout}>
            Sign out
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
