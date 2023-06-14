import { Link } from "react-router-dom";

import styles from "./styles/header.module.scss";

const Header = () => {
  return (
    <header className={styles["header"]}>
      <nav>
        <ul>
          <li>
            <Link to={"/dash/users"}>users</Link>
          </li>
          <li>
            <Link to={"/dash/notes"}>notes</Link>
          </li>
          <li>
            <Link to={"/login"}>login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
