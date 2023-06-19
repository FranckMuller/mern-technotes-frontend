import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRegistrationMutation } from "./auth-api";
import { setCredentials } from "./auth-slice";

import styles from "./styles/registration-form.module.scss";

const initialFormData = {
  username: "",
  password: "",
  repeatedPassword: "",
};

const USER_REGEX = /^[A-z0-9]{3,20}$/;
const PWD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isRepeatedPasswordValid, setIsRepeatedPasswordValid] = useState(true);
  const [registration, { isLoading, isSuccess, isError, error }] =
    useRegistrationMutation();

  const { username, password, repeatedPassword } = formData;

  const onChangeInput = (e) => {
    if (!isUsernameValid || !isPasswordValid || !isRepeatedPasswordValid) {
      setIsUsernameValid(true);
      setIsPasswordValid(true);
      setIsRepeatedPasswordValid(true);
    }
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (!USER_REGEX.test(username)) {
      setIsUsernameValid(false);
      return;
    }

    if (!PWD_REGEX.test(password)) {
      setIsPasswordValid(false);
      return;
    }

    if (password !== repeatedPassword) {
      setIsRepeatedPasswordValid(false);
      return;
    }

    try {
      const userData = await registration({ ...formData }).unwrap();
      dispatch(setCredentials(userData));
      setFormData(initialFormData);
      navigate("/dash");
    } catch (err) {
      console.log(err);
    }
  };

  const canSubmit = username && password && repeatedPassword;
  const errClass = isError ? "error" : "offscreen";
  const validUsernameClass = !isUsernameValid ? "incomplete-input" : "";
  const validPasswordClass = !isPasswordValid ? "incomplete-input" : "";
  const validMathcesPassword = !isRepeatedPasswordValid
    ? "incomplete-input"
    : "";

  return (
    <div className={styles["registration-form"]}>
      <h3 className={styles["title"]}>Sign up to technotes</h3>

      <form onSubmit={onSubmitForm}>
        <div className={styles["form-control"]}>
          <label htmlFor="username">
            Username:
            <span className={styles["input-rules"]}>[3-20 letters]</span>
          </label>
          <input
            className={styles[validUsernameClass]}
            name="username"
            id="username"
            autoComplete="off"
            value={username}
            onChange={onChangeInput}
          />
        </div>

        <div className={styles["form-control"]}>
          <label htmlFor="password">
            Password:
            <span className={styles["input-rules"]}>
              [min 8 chars incl. !@#$%]
            </span>
          </label>
          <input
            className={`${styles[validPasswordClass]} ${styles[validMathcesPassword]}`}
            type="password"
            name="password"
            id="password"
            autoComplete="off"
            value={password}
            onChange={onChangeInput}
          />
        </div>

        <div className={styles["form-control"]}>
          <label htmlFor="repeated-password">Repeat password:</label>
          <input
            className={styles[validMathcesPassword]}
            type="password"
            name="repeatedPassword"
            id="repeated-password"
            autoComplete="off"
            value={repeatedPassword}
            onChange={onChangeInput}
          />
        </div>

        <div className={styles["button-wrapper"]}>
          <button
            className={styles["registration-button"]}
            disabled={!canSubmit}
          >
            Sign up
          </button>
          <p className={styles[errClass]}>{error?.data?.message}</p>
        </div>

        <p className={styles["bottom-text"]}>
          Already have an account ? <Link to="/signin">sign in</Link>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
