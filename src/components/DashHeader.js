import { Link, useLocation } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";

import styles from "./styles/dash-header.module.scss";

const DashHeader = () => {
  const {pathname} = useLocation()
  const isVisibleArrow = !(pathname === "/dash");

  return (
    <div className={styles["dash-header"]}>
      <h3 className={styles["title"]}>
        <Link to="/dash">
          {isVisibleArrow && <BsArrowLeftShort />}
          TECHNOTES
        </Link>
      </h3>
      <nav className="dash-header__nav">{/* add nav buttons later */}</nav>
    </div>
  );
};

export default DashHeader;
