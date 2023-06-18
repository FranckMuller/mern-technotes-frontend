import { Link, useLocation } from "react-router-dom";

import styles from "./styles/header.module.scss";

const Header = () => {
  const location = useLocation();
  console.log(location);
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
            <Link to="/sign-in">sign-in</Link>
          </li>
        </ul>
        <Link to="/sign-up" className={styles["sign-up-link"]}>
          Sign Up
        </Link>
      </nav>
    </header>
  );
};

export default Header;
