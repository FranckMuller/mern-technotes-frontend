import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";

import styles from "./styles/dash-layout.module.scss";

const DashLayout = () => {
  return (
    <section className={styles["dash-layout"]}>
      <DashHeader />
      <div className={styles["dash-content"]}>
        <Outlet />
      </div>
      <DashFooter />
    </section>
  );
};
export default DashLayout;
