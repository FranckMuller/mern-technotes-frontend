import { Link } from "react-router-dom";

import styles from "./styles/welcome.module.scss";

const Welcome = () => {
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const content = (
    <section className={styles["welcome"]}>
      <h3 className={styles["title"]}>Welcome!</h3>

      <ul className={styles["nav"]}>
        <li>
          <Link to="/dash/notes">technotes</Link>
        </li>
        <li>
          <Link to="/dash/users">users settings</Link>
        </li>
      </ul>

      <p className={styles["date"]}>
        right now: <i>{today}</i>
      </p>
    </section>
  );

  return content;
};
export default Welcome;
