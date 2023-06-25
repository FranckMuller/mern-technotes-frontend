import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
import { useAuth } from "hooks/use-auth";

import styles from "./styles/dash-header.module.scss";

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAdmin, isManager } = useAuth();
  const isVisibleArrow = !(pathname === "/dash");

  const onNotesClicked = () => navigate("/dash/notes");
  const onNewNoteClicked = () => navigate("/dash/notes/new");
  const onUsersClicked = () => navigate("/dash/users");
  const onNewUserClicked = () => navigate("/dash/users/new");

  let notesButton = null;
  if (!NOTES_REGEX.test(pathname) && pathname.includes("/dash")) {
    notesButton = (
      <button onClick={onNotesClicked} className={styles["button"]}>
        notes
      </button>
    );
  }

  let newNoteButton = null;
  if (NOTES_REGEX.test(pathname)) {
    newNoteButton = (
      <button onClick={onNewNoteClicked} className={styles["button"]}>
        create
      </button>
    );
  }

  let usersButton = null;
  if (
    (isAdmin || isManager) &&
    !USERS_REGEX.test(pathname) &&
    pathname.includes("/dash")
  ) {
    usersButton = (
      <button onClick={onUsersClicked} className={styles["button"]}>
        users
      </button>
    );
  }

  let newUserButton = null;
  if (USERS_REGEX.test(pathname)) {
    newUserButton = (
      <button onClick={onNewUserClicked} className={styles["button"]}>
        create
      </button>
    );
  }

  return (
    <div className={styles["dash-header"]}>
      <h3 className={styles["title"]}>
        <Link to="/dash">
          {isVisibleArrow && <BsArrowLeftShort />}
          TECHNOTES
        </Link>
      </h3>
      <nav>
        {notesButton}
        {usersButton}
        {newNoteButton}
        {newUserButton}
      </nav>
    </div>
  );
};

export default DashHeader;
