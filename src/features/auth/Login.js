import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setCredentials } from "./auth-slice";
import { useLoginMutation } from "./auth-api";
import { usePersist } from "hooks/use-persist";

import styles from "./styles/login.module.scss";

const Login = () => {
  const errRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();

  const [login] = useLoginMutation();

  useEffect(() => {
    if (errMsg) setErrMsg("");
  }, [username, password]);

  const onChangeUsername = (e) => setUsername(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);
  const onChangePersist = () => setPersist((prev) => !prev);
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const authData = await login({ username, password }).unwrap();
      console.log(authData);
      dispatch(setCredentials({ ...authData }));
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
  const errClass = errMsg ? "error" : "offscreen";

  return (
    <section className={styles["login"]}>
      <h3 className={styles["title"]}>Login to technotes</h3>

      <form onSubmit={onSubmitForm}>
        <div className={styles["form-control"]}>
          <label htmlFor="username">Username:</label>
          <input
            name="username"
            id="username"
            autoComplete="off"
            value={username}
            onChange={onChangeUsername}
            required
          />
        </div>

        <div className={styles["form-control"]}>
          <label htmlFor="password">Password:</label>
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

        <div
          className={`${styles["form-control"]} ${styles["form-select-control"]}`}
        >
          <label htmlFor="persist">Trust this device?</label>
          <input
            name="persist"
            id="persist"
            type="checkbox"
            checked={persist}
            onChange={onChangePersist}
          />
        </div>
        <div className={styles["button-wrapper"]}>
          <button className={styles["signin-button"]} disabled={!canLogin}>
            sign in
          </button>
          
          <p ref={errRef} className={styles[errClass]} aria-live="assertive">
        {errMsg}
      </p>
        </div>

        <p className={styles["bottom-text"]}>
          New to Technotes ? <Link to="/signup">Create an account</Link>
        </p>
      </form>
    </section>
  );
};
export default Login;
