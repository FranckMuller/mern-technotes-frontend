import { Outlet } from "react-router-dom";
import Header from "./Header";

import styles from './styles/layout.module.scss'

const Layout = () => (
  <>
    <Header />
    <section className={styles["main"]}>
      <Outlet />
    </section>
  </>
);

export default Layout;
