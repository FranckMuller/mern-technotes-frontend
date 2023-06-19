import { useState, useEffect, useRef } from "react";
import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { useRefreshMutation } from "./auth-api";
import { selectAccessToken } from "./auth-slice";
import { usePersist } from "hooks/use-persist";

const PersistLogin = () => {
  const [persist] = usePersist();
  const accessToken = useSelector(selectAccessToken);
  const effectRun = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUnitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRun.current || process.env.NODE_ENV !== "development") {
      const verifyRefreshToken = async () => {
        console.log("verifying refresh token");
        try {
          const refreshResponse = await refresh();
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!accessToken && persist) verifyRefreshToken();
    }

    return () => (effectRun.current = true);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {!persist ? (
        <Outlet />
      ) : isLoading ? (
        <p>loading...</p>
      ) : isError ? (
        <p>
          {error.data?.message}
          <Link to="/signin">please login again</Link>
        </p>
      ) : isSuccess && trueSuccess ? (
        <Outlet />
      ) : accessToken && isUnitialized ? (
        <Outlet />
      ) : null}
    </>
  );
};

export default PersistLogin;
