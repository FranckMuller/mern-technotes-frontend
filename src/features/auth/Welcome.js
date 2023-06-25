import { Link } from "react-router-dom";
import { useAuth } from "hooks/use-auth";
import styles from "./styles/welcome.module.scss";

const Welcome = () => {
  const { username, isManager, isAdmin } = useAuth();
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const content = (
    <section className={styles["welcome"]}>
      <h3 className={styles["title"]}>Welcome {username}!</h3>

      <ul className={styles["nav"]}>
        <li>
          <Link to="/dash/notes">view technotes</Link>
        </li>
        <li>
          <Link to="/dash/notes/new">add new technote</Link>
        </li>
        {(isManager || isAdmin) && (
          <>
            <li>
              <Link to="/dash/users">view users</Link>
            </li>
            <li>
              <Link to="/dash/users/new">add new user</Link>
            </li>
          </>
        )}
      </ul>

      <p className={styles["date"]}>
        right now: <i>{today}</i>
      </p>
    </section>
  );

  return content;
};
export default Welcome;
