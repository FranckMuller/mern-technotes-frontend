import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "features/auth/auth-api";
import {useAuth} from 'hooks/use-auth'

import styles from "./styles/header.module.scss";

const Header = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const {isLogged} = useAuth() 
  const [logout, { isError, error, isSuccess }] = useLogoutMutation();

  const onLogout = () => {
    logout();
  };

  useEffect(() => {
    if (isSuccess) {
      navigation("/signin");
    }
  }, [isSuccess, navigation]);

  const path = location.pathname;

  let button = (
    <Link to="/signup" className={styles["signin-link"]}>
      Sign up
    </Link>
  );

  if (!isLogged && location.pathname === "/signup")
    button = (
      <Link to="/signin" className={styles["signup-link"]}>
        Sign in
      </Link>
    );

  if (isLogged) {
    button = (
      <button className={styles["signout-button"]} onClick={onLogout}>
        Sign out
      </button>
    );
  }

  return (
    <header className={styles["header"]}>
      <nav>{button}</nav>
    </header>
  );
};

export default Header;
