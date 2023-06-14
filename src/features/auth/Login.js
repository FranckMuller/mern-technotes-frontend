import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./auth-slice";
import { useLoginMutation } from "./auth-api";

import styles from "./styles/login.module.scss";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    if (errMsg) setErrMsg("");
  }, [username, password]);

  const onChangeUsername = (e) => setUsername(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/dash");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No server response");
      } else if (err.status === 400) {
        setErrMsg("Missing username or password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  const canLogin = username && password;

  const errClass = errMsg ? "errmsg" : "offscreen";

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className={styles["login"]}>
      <h3>Login</h3>
      <p ref={errRef} className={styles[errClass]} aria-live="assertive">
        {errMsg}
      </p>
      <form onSubmit={onSubmitForm}>
        <div className={styles["form-control"]}>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            id="username"
            autoComplete="off"
            ref={userRef}
            value={username}
            onChange={onChangeUsername}
            required
          />
        </div>

        <div className={styles["form-control"]}>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            id="password"
            autoComplete="off"
            value={password}
            onChange={onChangePassword}
            required
          />
        </div>
        <div className={styles["signin-button-wrap"]}>
          <button disabled={!canLogin}>sign in</button>
        </div>
      </form>
    </section>
  );
};
export default Login;
